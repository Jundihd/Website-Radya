/**
 * Enterprise Microservices Integration Client
 * Connects Next.js Frontend to Java (Spring Boot) & Golang Microservices on Microsoft Azure.
 */

export const JAVA_SPRING_BOOT_API = process.env.JAVA_SPRING_BOOT_API_URL || 'http://localhost:8080/api/v1';
export const GOLANG_MICROSERVICE_API = process.env.GOLANG_MICROSERVICE_API_URL || 'http://localhost:8081/api/v1';

export async function callSpringBootApi(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${JAVA_SPRING_BOOT_API}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Java Spring Boot Microservice call error:', error);
    return { status: 'fallback', message: 'Mock response during static build' };
  }
}

export async function callGolangMicroservice(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${GOLANG_MICROSERVICE_API}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Golang High-Concurrency Microservice call error:', error);
    return { status: 'fallback', message: 'Mock response during static build' };
  }
}
