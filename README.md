# Monorepo Boilterplate


### **📌 Module Generation **  

This script automates creating a **feature module** in the backend, following the **controller → service → repository** structure. Each module includes **basic CRUD boilerplate** for quick development.  

---

## **Usage**  

Run the command:  

```bash
npm run generate-module <module-name>
```

Example:  

```bash
npm run generate-module task
```

This generates:  

```
/src/modules/task/
│── task.route.ts        # Fastify routes
│── task.controller.ts   # API logic
│── task.service.ts      # Business logic
│── task.repository.ts   # Database queries
│── task.schema.ts       # Zod validation
```

---

## **Options**  

- **Force Overwrite:**  
  ```bash
  npm run generate-module task --force
  ```  
  Overwrites an existing module.  

- **Without CRUD (Routing Only):**  
  ```bash
  npm run generate-module task --no-crud
  ```  
  Generates only the route and controller.  

---

## **Features**  

- **Auto-Registers in `app.ts`** (no manual imports).  
- **Prettier Formatting** ensures clean code.  
- **Includes CRUD Boilerplate** for fast development.  
- **Follows Modular Project Structure** (Fastify, Drizzle ORM, Zod).  

---

Keep module names **lowercase** (e.g., `task`, `user`). The script enforces **clean, scalable** backend development.
