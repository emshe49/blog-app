import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './model/categoryModel.js';
import Blog from './model/blogModel.js';

dotenv.config();

const sampleImages = [
  '1788169251064.jpeg',
  '1753120866878.jpeg',
  '1752495718502.jpeg',
  '1752153405071.jpeg',
  '1752143678567.jpeg',
  '1752068948536.jpeg',
  '1752068802934.jpeg',
  '1752067821032.jpeg',
  '1752058867505.jpeg',
  '1752058522202.jpeg',
];

const seedCategoriesWithArticles = [
  {
    categoryTitle: 'Artificial Intelligence',
    articles: [
      {
        title: 'The Rise of Generative AI Agents: Architecture, Workflows, and Future Trends',
        description: `Autonomous AI agents are transforming how software systems interact, reason, and solve complex multi-step problems. By combining large language models (LLMs) with tool calling, memory stores, and dynamic planning loops, agents can execute autonomous workflows ranging from code refactoring to automated data analysis.

Key Architectural Components:
1. Perception & Prompt Strategy: Deconstructing user objectives into actionable sub-tasks.
2. Memory Architecture: Leveraging short-term conversational context and vector-based long-term retrieval.
3. Tool Execution Engine: Securely interfacing with sandboxed environments, APIs, and databases.
4. Self-Correction Loops: Evaluating intermediate results and replanning upon failures.

As models evolve with lower latencies and reasoning capabilities, agentic workflows will become the backbone of modern enterprise software.`,
        image: sampleImages[0],
      },
      {
        title: 'Understanding Large Language Models: Prompt Engineering, Fine-tuning, and RAG',
        description: `Integrating generative AI into production requires a solid understanding of optimization strategies. Depending on domain specificity, latency requirements, and cost constraints, developers must choose between prompt engineering, Retrieval-Augmented Generation (RAG), and fine-tuning.

• Prompt Engineering: The fastest way to prototype and steer model behavior using few-shot examples, system instructions, and structured output schemas.
• Retrieval-Augmented Generation (RAG): Grounds model responses in dynamic external knowledge bases, preventing hallucinations while maintaining data privacy.
• Fine-Tuning: Ideal for tailoring tone, style, or specific syntax rules when prompt contexts become too large or expensive.

Mastering these paradigms ensures high-quality, cost-efficient, and deterministic AI applications.`,
        image: sampleImages[1],
      },
    ],
  },
  {
    categoryTitle: 'Web Development',
    articles: [
      {
        title: 'Mastering React 19: Actions, Server Components, and Optimistic UI Updates',
        description: `React 19 brings a suite of game-changing primitives that simplify asynchronous state management and form handling across client and server boundaries.

Key Highlights in React 19:
1. useActionState & useFormStatus: Eliminates boilerplate for form submissions, pending spinners, and error boundaries.
2. useOptimistic: Seamlessly render UI updates before server confirmation, creating buttery-smooth user experiences.
3. Native Resource Loading: Declarative preloading for stylesheets, scripts, and fonts directly within the React tree.
4. Server Components (RSC): Drastically reduce client bundle sizes by executing data fetching directly on the server.

Adopting these modern patterns leads to cleaner codebases and faster load times.`,
        image: sampleImages[2],
      },
      {
        title: 'Building Scalable Full-Stack Web Applications with Tailwind CSS and Node.js',
        description: `Creating modern, production-grade web applications requires a robust architecture, consistent styling tokens, and scalable API design.

Best Practices for Modern Web Apps:
• Utility-First Design with Tailwind CSS: Maintain consistent design systems, dark-mode themes, and fluid typography without bloated CSS files.
• RESTful & Modular Express APIs: Decouple business logic into controllers, validation middleware, and data access layers.
• Secure Authentication: Utilize HTTP-only cookies, JSON Web Tokens (JWT), and role-based access control (RBAC).
• Responsive Layouts: Mobile-first approach ensuring flawless adaptability across smartphones, tablets, and high-DPI desktop displays.

Building with clean separation of concerns ensures your web application scales smoothly as your user base grows.`,
        image: sampleImages[3],
      },
    ],
  },
  {
    categoryTitle: 'Cloud & DevOps',
    articles: [
      {
        title: 'Docker and Kubernetes for Beginners: Containerizing and Orchestrating Microservices',
        description: `Containerization has revolutionized how applications are packaged, shipped, and run across diverse computing environments.

Understanding the Core Principles:
1. Docker Containers vs Virtual Machines: Containers share the host OS kernel, making them lightweight, rapid to start, and resource-efficient.
2. Multi-Stage Docker Builds: Minimize production image sizes by separating compilation dependencies from runtime artifacts.
3. Kubernetes Orchestration: Automate deployment, scaling, load balancing, and self-healing across clusters of nodes.
4. Declarative Infrastructure: Managing service manifests and ingress controllers through GitOps workflows.

Embracing containerization ensures deterministic deployments from local development to cloud production.`,
        image: sampleImages[4],
      },
      {
        title: 'CI/CD Automation Pipelines: Best Practices for Continuous Delivery in 2026',
        description: `Continuous Integration and Continuous Deployment (CI/CD) pipelines allow engineering teams to ship high-quality features rapidly and reliably.

Key Pillars of an Effective Pipeline:
• Automated Quality Gates: Run linting, static analysis, unit tests, and integration tests on every pull request.
• Security & Vulnerability Scanning: Automatically audit dependencies and container images for known CVEs.
• Ephemeral Preview Environments: Spin up isolated staging instances for automated QA testing and stakeholder review.
• Zero-Downtime Deployments: Utilize blue-green or rolling release strategies to eliminate user disruption during updates.

A well-architected pipeline empowers developers to ship code with total confidence.`,
        image: sampleImages[5],
      },
    ],
  },
  {
    categoryTitle: 'Cybersecurity',
    articles: [
      {
        title: 'Zero-Trust Architecture: Securing Distributed Applications in Modern Environments',
        description: `The traditional perimeter-based security model is obsolete in an era of remote work, cloud hosting, and microservice architectures. Zero-Trust operates on the principle: "Never trust, always verify."

Core Tenets of Zero-Trust:
1. Continuous Authentication & Verification: Every request must be verified with strong identity credentials and contextual factors.
2. Principle of Least Privilege: Grant users and microservices the minimum permissions required to perform their tasks.
3. Micro-Segmentation: Restrict lateral network movement by isolating sensitive database workloads and services.
4. End-to-End Encryption: Enforce TLS for all internal and external communication channels.

Implementing Zero-Trust provides defense-in-depth against modern cyber threats.`,
        image: sampleImages[6],
      },
      {
        title: 'Web Application Security Checklist: Defending Against OWASP Top 10 Vulnerabilities',
        description: `Securing web applications requires proactive defensive coding practices and rigorous validation at every layer.

Essential Security Measures:
• Injection Prevention: Use parameterized queries and ORMs/ODMs to prevent SQL and NoSQL injection attacks.
• Cross-Site Scripting (XSS) Mitigation: Sanitize untrusted input and implement strict Content Security Policy (CSP) headers.
• CSRF Protection: Utilize SameSite cookies and anti-CSRF verification tokens for state-changing requests.
• Rate Limiting & DDoS Defense: Apply token-bucket rate limiting on sensitive routes like authentication and password resets.

Regular security audits and automated vulnerability scanning are essential to maintaining resilient applications.`,
        image: sampleImages[7],
      },
    ],
  },
  {
    categoryTitle: 'Mobile & Cross-Platform',
    articles: [
      {
        title: 'Flutter vs React Native: Comprehensive Performance and Ecosystem Comparison',
        description: `Choosing the right cross-platform mobile framework is a foundational decision for development teams targeting iOS and Android.

Comparative Breakdown:
• Rendering Engine: Flutter uses the Skia/Impeller graphics engine for pixel-perfect custom widgets, while React Native bridges to native platform UI components.
• Language & Ecosystem: React Native leverages JavaScript/TypeScript and the vast npm ecosystem. Flutter utilizes Dart with strong typing and AOT compilation.
• Performance: Flutter excels in rendering complex animations and games, while React Native provides near-native UI feel and easier integration with existing web codebases.

Both frameworks offer excellent developer productivity, hot reload, and thriving communities.`,
        image: sampleImages[8],
      },
      {
        title: 'Building Offline-First Mobile Apps: Data Synchronization and Local Storage Architecture',
        description: `Modern users expect mobile applications to remain functional regardless of intermittent or absent network connectivity.

Offline-First Architecture Patterns:
1. Local Database Layer: Store application state locally using SQLite, Hive, or WatermelonDB.
2. Optimistic Mutations: Immediately update the UI locally and enqueue background synchronization tasks.
3. Conflict Resolution Strategies: Implement Last-Write-Wins (LWW) or operational transformations for simultaneous edits.
4. Connectivity Observers: Automatically trigger synchronization queues when network connectivity is re-established.

Building offline-first ensures lightning-fast app launch times and unmatched reliability.`,
        image: sampleImages[9],
      },
    ],
  },
];

async function seedData() {
  try {
    const mongoUri = process.env.MONGO_URL;
    if (!mongoUri) {
      throw new Error('MONGO_URL not found in .env');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    for (const item of seedCategoriesWithArticles) {
      // Find or create category
      let category = await Category.findOne({ title: item.categoryTitle });
      if (!category) {
        category = new Category({
          title: item.categoryTitle,
          blogs: [],
        });
        await category.save();
        console.log(`Created Category: "${item.categoryTitle}"`);
      } else {
        console.log(`Category already exists: "${item.categoryTitle}"`);
      }

      // Create articles for this category
      for (const art of item.articles) {
        // Check if article with title already exists
        let blog = await Blog.findOne({ title: art.title });
        if (!blog) {
          blog = new Blog({
            title: art.title,
            description: art.description,
            image: art.image,
            category: {
              _id: category._id,
              title: category.title,
            },
            favouriteBlogByUsers: [],
            likedBlogByUser: [],
          });
          await blog.save();

          // Push blog to category blogs array if not already present
          if (!category.blogs.includes(blog._id)) {
            category.blogs.push(blog._id);
            await category.save();
          }

          console.log(`  + Created Article: "${art.title}" in [${category.title}]`);
        } else {
          // Ensure category reference is linked
          if (!category.blogs.includes(blog._id)) {
            category.blogs.push(blog._id);
            await category.save();
          }
          console.log(`  - Article already exists: "${art.title}"`);
        }
      }
    }

    console.log('\n Successfully seeded 5 categories and 2 articles each (10 total)!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedData();
