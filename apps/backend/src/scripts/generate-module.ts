import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

// Get module name from command line
const moduleName = process.argv[2];
const forceFlag = process.argv.includes('--force');
const noCrudFlag = process.argv.includes('--no-crud');

if (!moduleName) {
  console.error(
    '❌ Please provide a module name. Example: npm run generate-module task'
  );
  process.exit(1);
}

// Convert module name to proper format
const moduleDir = path.join(__dirname, '../modules', moduleName);
const className = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

// Prevent overwriting existing modules unless `--force` is used
if (fs.existsSync(moduleDir) && !forceFlag) {
  console.error(
    `❌ Module '${moduleName}' already exists! Use --force to overwrite.`
  );
  process.exit(1);
}

// Ensure module directory exists
fs.ensureDirSync(moduleDir);

// File Templates
const routeTemplate = `import { FastifyInstance } from "fastify";
import { ${className}Controller } from "./${moduleName}.controller";

export default async function (fastify: FastifyInstance) {
  fastify.register(async (fastify) => {
    fastify.get("/", ${className}Controller.findAll);
    fastify.get("/:id", ${className}Controller.findOne);
    fastify.post("/", ${className}Controller.create);
    fastify.put("/:id", ${className}Controller.update);
    fastify.delete("/:id", ${className}Controller.delete);
  }, { prefix: "/${moduleName}" });
}
`;

const controllerTemplate = `import { FastifyRequest, FastifyReply } from "fastify";
import { ${className}Service } from "./${moduleName}.service";
import { ${className}Schema } from "./${moduleName}.schema";

export class ${className}Controller {
  public static async findAll(req: FastifyRequest, res: FastifyReply) {
    const data = await ${className}Service.findAll();
    return res.send({ success: true, data });
  }

  public static async findOne(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    const data = await ${className}Service.findOne(req.params.id);
    return res.send({ success: true, data });
  }

  public static async create(req: FastifyRequest<{ Body: any }>, res: FastifyReply) {
    try {
      const validatedData = ${className}Schema.parse(req.body);
      const data = await ${className}Service.create(validatedData);
      return res.status(201).send({ success: true, data });
    } catch (err) {
      return res.status(400).send({ success: false, message: err.errors });
    }
  }

  public static async update(req: FastifyRequest<{ Params: { id: string }, Body: any }>, res: FastifyReply) {
    const data = await ${className}Service.update(req.params.id, req.body);
    return res.send({ success: true, data });
  }

  public static async delete(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    await ${className}Service.delete(req.params.id);
    return res.send({ success: true, message: "Deleted successfully" });
  }
}
`;

const serviceTemplate = `import { ${className}Repository } from "./${moduleName}.repository";

export class ${className}Service {
  public static async findAll() {
    return ${className}Repository.findAll();
  }

  public static async findOne(id: string) {
    return ${className}Repository.findOne(id);
  }

  public static async create(data: any) {
    return ${className}Repository.create(data);
  }

  public static async update(id: string, data: any) {
    return ${className}Repository.update(id, data);
  }

  public static async delete(id: string) {
    return ${className}Repository.delete(id);
  }
}
`;

const repositoryTemplate = `export class ${className}Repository {
  private static data: any[] = []; // Simulated database

  public static async findAll() {
    return this.data;
  }

  public static async findOne(id: string) {
    return this.data.find(item => item.id === id);
  }

  public static async create(data: any) {
    data.id = (this.data.length + 1).toString();
    this.data.push(data);
    return data;
  }

  public static async update(id: string, newData: any) {
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...newData };
      return this.data[index];
    }
    return null;
  }

  public static async delete(id: string) {
    this.data = this.data.filter(item => item.id !== id);
  }
}
`;

const schemaTemplate = `import { z } from "zod";

export const ${className}Schema = z.object({
  title: z.string().min(1, "Title is required"),
});
`;

// Write files
fs.writeFileSync(path.join(moduleDir, `${moduleName}.route.ts`), routeTemplate);
fs.writeFileSync(
  path.join(moduleDir, `${moduleName}.controller.ts`),
  controllerTemplate
);
fs.writeFileSync(
  path.join(moduleDir, `${moduleName}.schema.ts`),
  schemaTemplate
);

if (!noCrudFlag) {
  fs.writeFileSync(
    path.join(moduleDir, `${moduleName}.service.ts`),
    serviceTemplate
  );
  fs.writeFileSync(
    path.join(moduleDir, `${moduleName}.repository.ts`),
    repositoryTemplate
  );
}

console.log(`✅ Module '${moduleName}' generated successfully!`);

// Format the generated files using Prettier
console.log('🎨 Formatting files with Prettier...');
try {
  execSync(`npx prettier --write "${moduleDir}/*.ts"`, { stdio: 'inherit' });
  console.log('✅ Formatting complete!');
} catch (error) {
  console.error('❌ Prettier formatting failed!', error);
}
