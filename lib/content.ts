import "server-only";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { Empresa, Noticia, Proyecto, Servicio } from "./schemas";

const dir = path.join(process.cwd(), "content");

function readJson(file: string): unknown {
  return JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
}

function parse<T extends z.ZodTypeAny>(schema: T, data: unknown, file: string): z.infer<T> {
  const r = schema.safeParse(data);
  if (!r.success) {
    throw new Error(`Contenido inválido en content/${file}:\n${r.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n")}`);
  }
  return r.data;
}

function readFolder<T extends z.ZodTypeAny>(folder: string, schema: T): z.infer<T>[] {
  const p = path.join(dir, folder);
  if (!fs.existsSync(p)) return [];
  return fs
    .readdirSync(p)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => parse(schema, readJson(`${folder}/${f}`), `${folder}/${f}`));
}

export const getEmpresa = () => parse(Empresa, readJson("empresa.json"), "empresa.json");
export const getServicios = () => parse(z.array(Servicio), readJson("servicios.json"), "servicios.json");
export const getProyectos = () => readFolder("proyectos", Proyecto).sort((a, b) => b.anio - a.anio);
export const getNoticias = () =>
  readFolder("noticias", Noticia).sort((a, b) => b.fecha.localeCompare(a.fecha));
