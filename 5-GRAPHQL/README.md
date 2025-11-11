# 5-GRAPHQL - API GraphQL con Gateway

## 📝 Descripción

Implementación de **GraphQL** para el sistema de estacionamiento vehicular, utilizando arquitectura de microservicios con un **API Gateway**. Proporciona una interfaz flexible y eficiente para consultar y manipular datos del sistema.

## 🎯 Características

- **GraphQL API**: Consultas flexibles y eficientes
- **API Gateway**: Punto de entrada único para microservicios
- **Federation**: Arquitectura de microservicios federados
- **Schema First**: Definición de esquemas GraphQL
- **Resolvers**: Lógica de resolución de consultas
- **Subscriptions**: Actualizaciones en tiempo real (opcional)
- **Apollo Server**: Servidor GraphQL robusto
- **DataLoader**: Optimización de consultas a base de datos

## 🛠️ Tecnologías Utilizadas

- **NestJS**: v10.x - Framework base
- **GraphQL**: API con tipado fuerte
- **Apollo Server**: Servidor GraphQL
- **Apollo Gateway**: Gateway para microservicios
- **TypeORM**: Integración con base de datos
- **PostgreSQL**: Base de datos
- **TypeScript**: Lenguaje principal

## 📦 Estructura del Proyecto

```
5-GRAPHQL/
├── API - copia/
│   ├── alquiler-rest/              # Microservicio REST
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   └── proyecto-graphql-gateway/   # Gateway GraphQL
│       ├── src/
│       │   ├── modules/
│       │   │   ├── clients/        # Módulo de Clientes
│       │   │   ├── vehicles/       # Módulo de Vehículos
│       │   │   ├── parking/        # Módulo de Estacionamiento
│       │   │   ├── transactions/   # Módulo de Transacciones
│       │   │   └── operations/     # Módulo de Operaciones
│       │   ├── app.module.ts
│       │   └── main.ts
│       ├── schema.gql              # Schema GraphQL
│       ├── package.json
│       └── ...
```

## 🚀 Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- PostgreSQL (v12 o superior)
- npm (v9 o superior)

### Instalación del Gateway

1. **Navegar a la carpeta del gateway:**
   ```bash
   cd "5-GRAPHQL/API - copia/proyecto-graphql-gateway"
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

   Dependencias principales:
   - `@nestjs/graphql`: Para integración GraphQL
   - `@nestjs/apollo`: Apollo Server
   - `@apollo/server`: Servidor GraphQL
   - `@apollo/gateway`: Gateway federado
   - `graphql`: Core de GraphQL
   - `apollo-server-express`: Servidor Apollo
   - Todas las dependencias de NestJS

3. **Instalar dependencias específicas de GraphQL:**
   ```bash
   npm install @nestjs/graphql @nestjs/apollo @apollo/server graphql
   npm install @apollo/gateway @apollo/subgraph
   ```

### Instalación del Microservicio

1. **Navegar a la carpeta del microservicio:**
   ```bash
   cd "5-GRAPHQL/API - copia/alquiler-rest"
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

## ⚙️ Configuración

### 1. Configurar Gateway

Edita el archivo de configuración del Gateway:

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'clients', url: 'http://localhost:3001/graphql' },
            { name: 'parking', url: 'http://localhost:3002/graphql' },
            // Más subgraphs según necesidad
          ],
        }),
      },
    }),
  ],
})
export class AppModule {}
```

### 2. Variables de Entorno

Crea un archivo `.env` en cada proyecto:

**Gateway (.env):**
```env
PORT=4000
NODE_ENV=development
```

**Microservicio (.env):**
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=estacionamiento_db
GRAPHQL_PATH=/graphql
```

### 3. Schema GraphQL

Define tu esquema en `schema.gql`:

```graphql
type Cliente {
  id: ID!
  nombre: String!
  apellido: String!
  email: String!
  telefono: String
  vehiculos: [Vehiculo!]
  createdAt: DateTime!
}

type Vehiculo {
  id: ID!
  placa: String!
  marca: String!
  modelo: String!
  color: String
  cliente: Cliente!
  tipoVehiculo: TipoVehiculo!
}

type Espacio {
  id: ID!
  numero: String!
  disponible: Boolean!
  seccion: Seccion!
  tipoVehiculo: TipoVehiculo!
}

type Ticket {
  id: ID!
  fechaEntrada: DateTime!
  fechaSalida: DateTime
  vehiculo: Vehiculo!
  espacio: Espacio!
  estado: String!
  monto: Float
}

type Pago {
  id: ID!
  ticket: Ticket!
  monto: Float!
  metodoPago: String!
  fechaPago: DateTime!
  estado: String!
}

type Query {
  # Clientes
  clientes: [Cliente!]!
  cliente(id: ID!): Cliente
  clientePorEmail(email: String!): Cliente
  
  # Vehículos
  vehiculos: [Vehiculo!]!
  vehiculo(id: ID!): Vehiculo
  vehiculoPorPlaca(placa: String!): Vehiculo
  
  # Espacios
  espacios: [Espacio!]!
  espaciosDisponibles: [Espacio!]!
  espacio(id: ID!): Espacio
  
  # Tickets
  tickets: [Ticket!]!
  ticketsActivos: [Ticket!]!
  ticket(id: ID!): Ticket
  
  # Pagos
  pagos: [Pago!]!
  pagosPorCliente(clienteId: ID!): [Pago!]!
}

type Mutation {
  # Clientes
  crearCliente(input: CreateClienteInput!): Cliente!
  actualizarCliente(id: ID!, input: UpdateClienteInput!): Cliente!
  eliminarCliente(id: ID!): Boolean!
  
  # Vehículos
  registrarVehiculo(input: CreateVehiculoInput!): Vehiculo!
  actualizarVehiculo(id: ID!, input: UpdateVehiculoInput!): Vehiculo!
  
  # Operaciones
  registrarEntrada(input: EntradaInput!): Ticket!
  registrarSalida(ticketId: ID!): Ticket!
  
  # Pagos
  procesarPago(input: CreatePagoInput!): Pago!
}

input CreateClienteInput {
  nombre: String!
  apellido: String!
  email: String!
  telefono: String
}

input UpdateClienteInput {
  nombre: String
  apellido: String
  telefono: String
}

input CreateVehiculoInput {
  placa: String!
  marca: String!
  modelo: String!
  color: String
  clienteId: ID!
  tipoVehiculoId: ID!
}

input EntradaInput {
  vehiculoId: ID!
  espacioId: ID!
}

input CreatePagoInput {
  ticketId: ID!
  metodoPago: String!
}

scalar DateTime
```

## 🏃‍♂️ Comandos Disponibles

### Gateway

```bash
cd "5-GRAPHQL/API - copia/proyecto-graphql-gateway"

# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

El Gateway estará disponible en: `http://localhost:4000/graphql`

### Microservicio

```bash
cd "5-GRAPHQL/API - copia/alquiler-rest"

# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📡 Uso de GraphQL

### GraphQL Playground

Accede al playground en: `http://localhost:4000/graphql`

### Ejemplos de Queries

#### Listar Clientes
```graphql
query {
  clientes {
    id
    nombre
    apellido
    email
    vehiculos {
      placa
      marca
      modelo
    }
  }
}
```

#### Obtener Cliente por ID
```graphql
query {
  cliente(id: "uuid-cliente") {
    id
    nombre
    apellido
    email
    telefono
    vehiculos {
      id
      placa
      marca
      modelo
      tipoVehiculo {
        nombre
      }
    }
  }
}
```

#### Espacios Disponibles
```graphql
query {
  espaciosDisponibles {
    id
    numero
    seccion {
      nombre
    }
    tipoVehiculo {
      nombre
    }
  }
}
```

#### Tickets Activos
```graphql
query {
  ticketsActivos {
    id
    fechaEntrada
    vehiculo {
      placa
      marca
      modelo
    }
    espacio {
      numero
    }
  }
}
```

### Ejemplos de Mutations

#### Crear Cliente
```graphql
mutation {
  crearCliente(input: {
    nombre: "Juan"
    apellido: "Pérez"
    email: "juan@example.com"
    telefono: "0999999999"
  }) {
    id
    nombre
    apellido
    email
  }
}
```

#### Registrar Vehículo
```graphql
mutation {
  registrarVehiculo(input: {
    placa: "ABC-1234"
    marca: "Toyota"
    modelo: "Corolla"
    color: "Blanco"
    clienteId: "uuid-cliente"
    tipoVehiculoId: "uuid-tipo"
  }) {
    id
    placa
    marca
    modelo
    cliente {
      nombre
      apellido
    }
  }
}
```

#### Registrar Entrada
```graphql
mutation {
  registrarEntrada(input: {
    vehiculoId: "uuid-vehiculo"
    espacioId: "uuid-espacio"
  }) {
    id
    fechaEntrada
    vehiculo {
      placa
    }
    espacio {
      numero
    }
    estado
  }
}
```

#### Registrar Salida
```graphql
mutation {
  registrarSalida(ticketId: "uuid-ticket") {
    id
    fechaSalida
    monto
    estado
  }
}
```

#### Procesar Pago
```graphql
mutation {
  procesarPago(input: {
    ticketId: "uuid-ticket"
    metodoPago: "tarjeta"
  }) {
    id
    monto
    metodoPago
    fechaPago
    estado
  }
}
```

## 🔍 Resolvers

### Ejemplo: Cliente Resolver

```typescript
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteInput } from './dto/create-cliente.input';

@Resolver(() => Cliente)
export class ClientesResolver {
  constructor(private readonly clientesService: ClientesService) {}

  @Query(() => [Cliente])
  async clientes(): Promise<Cliente[]> {
    return this.clientesService.findAll();
  }

  @Query(() => Cliente, { nullable: true })
  async cliente(@Args('id') id: string): Promise<Cliente> {
    return this.clientesService.findOne(id);
  }

  @Mutation(() => Cliente)
  async crearCliente(
    @Args('input') input: CreateClienteInput
  ): Promise<Cliente> {
    return this.clientesService.create(input);
  }
}
```

## 🎨 Ventajas de GraphQL

1. **Consultas Flexibles**: El cliente pide exactamente lo que necesita
2. **Sin Over-fetching**: No se traen datos innecesarios
3. **Sin Under-fetching**: Una consulta obtiene todos los datos relacionados
4. **Tipado Fuerte**: Schema define tipos claramente
5. **Documentación Automática**: Schema documenta la API
6. **Evolución sin Versiones**: Agregar campos no rompe clientes existentes

## 🔧 Solución de Problemas

### Error: "Cannot query field"
- Verifica que el campo esté definido en el schema
- Revisa que el resolver esté implementado

### Error de conexión entre Gateway y Microservicio
```bash
# Verifica que el microservicio esté corriendo
# Verifica las URLs en la configuración del Gateway
```

### Error: "Schema must contain uniquely named types"
- Verifica que no haya tipos duplicados en diferentes schemas
- Usa namespacing para evitar conflictos

### Puerto en uso
```bash
# Cambiar puerto en .env
PORT=4001
```

## 📚 Recursos Adicionales

- [GraphQL Documentation](https://graphql.org/learn/)
- [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Apollo Gateway](https://www.apollographql.com/docs/federation/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)

## 🎯 Mejoras Futuras

1. **Subscriptions**: Actualizaciones en tiempo real
2. **DataLoader**: Optimización de consultas N+1
3. **Caché**: Apollo Cache para mejorar rendimiento
4. **Autenticación**: JWT en contexto GraphQL
5. **Rate Limiting**: Limitar complejidad de queries
6. **Monitoring**: Apollo Studio para análisis

## 🤝 Contribución

Este es un proyecto académico para la materia de Aplicaciones para Servidor Web.
