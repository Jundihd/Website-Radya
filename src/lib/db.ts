/**
 * Database & Cache Layer Connections Configuration
 * PostgreSQL (Primary Relational DB), Redis (In-Memory Page & API Caching), Azure SQL Database.
 */

export interface DatabaseConfig {
  postgresConnectionString: string;
  redisCacheUrl: string;
  azureSqlConnectionString: string;
}

export const dbConfig: DatabaseConfig = {
  postgresConnectionString: process.env.POSTGRES_URL || 'postgresql://radya_user:secret_pass@azure-pg.postgres.database.azure.com:5432/radya_prod',
  redisCacheUrl: process.env.REDIS_URL || 'redis://azure-redis.redis.cache.windows.net:6380',
  azureSqlConnectionString: process.env.AZURE_SQL_URL || 'Server=tcp:radyalabs.database.windows.net,1433;Initial Catalog=radyadb;',
};

export async function getCachedOrFetch<T>(cacheKey: string, fetchFn: () => Promise<T>): Promise<T> {
  // In production with Redis, query Redis first. If cache miss, execute fetchFn and store in Redis.
  return await fetchFn();
}
