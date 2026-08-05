import { NextResponse } from 'next/server';
import { dbConfig } from '@/lib/db';

export async function GET() {
  return NextResponse.json({
    status: 'configured',
    databases: {
      primaryRelational: {
        engine: 'PostgreSQL',
        connectionConfigured: !!dbConfig.postgresConnectionString,
      },
      inMemoryCache: {
        engine: 'Redis',
        connectionConfigured: !!dbConfig.redisCacheUrl,
      },
      cloudEnterpriseStore: {
        engine: 'Azure SQL Database',
        connectionConfigured: !!dbConfig.azureSqlConnectionString,
      },
    },
  });
}
