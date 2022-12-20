import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'picthat',

  dataset: 'production',
  projectId: import.meta.env.SANITY_PROJECT_ID,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
