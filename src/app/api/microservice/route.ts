import { NextResponse } from 'next/server';
import { JAVA_SPRING_BOOT_API, GOLANG_MICROSERVICE_API } from '@/lib/microservices';

export async function GET() {
  return NextResponse.json({
    status: 'online',
    microservices: [
      {
        name: 'Enterprise Business Logic & ERP Integrator',
        framework: 'Java (Spring Boot 3)',
        endpoint: JAVA_SPRING_BOOT_API,
      },
      {
        name: 'High-Concurrency Processing & Real-time Telemetry Engine',
        framework: 'Golang 1.22',
        endpoint: GOLANG_MICROSERVICE_API,
      },
    ],
    hosting: 'Microsoft Azure Web App for Containers & Azure Kubernetes Service (AKS)',
  });
}
