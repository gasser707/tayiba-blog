import { createDirectus, graphql, rest, staticToken } from '@directus/sdk';
const directus = createDirectus(process.env.NEXT_PUBLIC_API_URL as string)
.with(staticToken( process.env.ADMIN_TOKEN as string))
// .with(rest())
.with(graphql())

export default directus;
