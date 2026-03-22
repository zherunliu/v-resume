import { z } from 'zod'

const personalExperienceSchema = z.object({
  header: z.string(),
  details: z.array(z.string()),
})

const eduExperienceSchema = z.tuple([z.string(), z.string(), z.string()])
const eduExperienceListSchema = z.object({
  header: z.string(),
  details: z.array(eduExperienceSchema),
})

const resumeSchema = z.object({
  name: z.string(),
  tel: z.string(),
  email: z.string(),
  github: z.string(),
  myInfo: z.string(),
  eduExperienceList: eduExperienceListSchema,
  personalExperienceList: z.array(personalExperienceSchema),
})

export type TResume = z.infer<typeof resumeSchema>
export type TEduExperience = z.infer<typeof eduExperienceSchema>
export type TEduExperienceList = z.infer<typeof eduExperienceListSchema>
export type TPersonalExperience = z.infer<typeof personalExperienceSchema>

export { resumeSchema, eduExperienceSchema, personalExperienceSchema }
