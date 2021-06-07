import Prismic from '@prismicio/client';

const repo = 'prismicio-docs-v3';

const url = `https://${repo}.cdn.prismic.io/api/v2`;

const Client = Prismic.client(url);

export default Client;
