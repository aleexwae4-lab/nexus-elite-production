export const manuals = [
  {
    name: "Manual de Prompts para Interfaces Futuristas y de Lujo",
    type: "UI/UX Architecture",
    content: `
# Manual de Prompts para Interfaces Futuristas y de Lujo

## 1. Fundamentos
- **Prompt Maestro**: Objeto (Qué), Estilo (Cómo), Contexto (Para quién), Restricciones (Límites).
- **Estilos Visuales**: Glassmorphism (transparencia, desenfoque), Cromo Líquido (metálico, reflejos), Neón (brillante, alto contraste), Holográfico (iridiscente, 3D), Minimalismo Futurista (espacios generosos, monocromático), Brutalismo Digital (contraste fuerte, disruptivo).

## 2. Técnicas Avanzadas
- **Glassmorphism**: \`backdrop-filter: blur()\`, capas translúcidas, bordes luminosos.
- **Tipografía**: Inter (Dashboards), Space Grotesk (Creativas), JetBrains Mono (Código). Usar fuentes variables.
- **Motion Design**: Microinteracciones, animaciones atómicas, feedback inmediato.

## 3. Dashboards con IA
- Diseñar para preguntas, revelación progresiva, claridad y jerarquía visual.
- **Visualización de Datos**: d3 (personalizado), recharts (React declarativo), echarts (empresarial).

## 4. Arquitectura y Performance
- **Frontend**: React (SPAs, UI complejas), Next.js.
- **Optimización**: Lazy loading, code splitting, accesibilidad (WCAG AA/AAA).
- **3D**: Three.js, WebGL para efectos de vidrio y cromo líquido.
    `
  },
  {
    name: "Manual de Prompts para IA en GitHub.com",
    type: "DevOps & Automation",
    content: `
# Manual de Prompts para IA en GitHub.com

## 1. Fundamentos y Flujos
- **GitHub**: Plataforma para control de versiones, colaboración (Pull Requests, Issues), automatización (Actions) y seguridad.
- **APIs**: REST API (endpoints fijos, CRUD), GraphQL API (consultas flexibles).
- **Autenticación**: PATs, Fine-Grained Tokens, GitHub Apps, GITHUB_TOKEN.

## 2. Automatización con GitHub Actions
- **Sintaxis YAML**: \`name\`, \`on\` (eventos), \`jobs\`, \`steps\`, \`runs-on\`.
- **Secretos**: Almacenar cifrados, inyectar como variables de entorno, no exponer en logs.
- **Webhooks**: Payloads JSON, seguridad HMAC (\`X-Hub-Signature-256\`).

## 3. Gestión de Repositorios e Issues
- **Branch Protection**: Requerir revisiones, prohibir force-push.
- **CODEOWNERS**: Asignar revisores automáticamente.
- **Issues**: Clasificación, etiquetado, priorización mediante IA.

## 4. Seguridad y Despliegue
- **Dependabot y SCA**: Detección de vulnerabilidades.
- **Secret Scanning**: Buscar secretos expuestos.
- **GitHub Packages**: Gestión de artefactos y contenedores.
    `
  },
  {
    name: "Manual de Prompts para IA en Vercel.com",
    type: "Cloud Infrastructure",
    content: `
# Manual de Prompts para IA en Vercel.com

## 1. Fundamentos de Vercel
- **Plataforma**: Despliegue y hosting para frontend moderno (Next.js, React).
- **Arquitectura**: CDN Global, Serverless Functions (AWS Lambda), Edge Functions (V8 isolates), Preview Deployments.
- **Integración**: GitHub, GitLab, Bitbucket para CI/CD automático.

## 2. Casos de Uso con IA
- **Despliegue Automático**: Generación de sitio por IA -> Exportación -> Despliegue en Vercel.
- **Serverless y Edge**: APIs dinámicas, personalización en tiempo real, middleware de seguridad.
- **Observabilidad**: Monitoreo de despliegues, análisis de logs, respuesta a incidentes.

## 3. Prompts Maestros para Vercel
- **Estructura**: Rol (DevOps Engineer), Contexto (estado del proyecto), Objetivo (desplegar rama), Variables (entorno), Formato de Salida, Criterios de Calidad.
- **Seguridad**: Prevención de Prompt Injection, validación de entradas/salidas, auditoría.

## 4. Vercel MCP y Sandbox
- **Model Context Protocol (MCP)**: Estándar para que agentes de IA interactúen con Vercel (buscar docs, gestionar despliegues).
- **Vercel Sandbox**: Ejecución segura de código no confiable en microVMs Firecracker.
    `
  }
];
