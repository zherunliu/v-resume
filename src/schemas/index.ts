import { z } from 'zod'

const headersSchema = z.object({
  eduExperience: z.string(),
  devAbilities: z.string(),
  jobExperience: z.string(),
  projectExperience: z.string(),
  // Award Experience
  awardExperience: z.string(),
  researchExperience: z.string(),
})

const eduExperienceSchema = z.tuple([z.string(), z.string(), z.string()])

const resumeSchema = z.object({
  headers: headersSchema,
  name: z.string(),
  tel: z.string(),
  email: z.string(),
  github: z.string(),
  myInfo: z.string(),
  eduExperienceList: z.array(eduExperienceSchema),
  devAbilitiesList: z.array(z.string()),
  jobExperienceList: z.array(z.string()),
  projectExperienceList: z.array(z.string()),
  // Award Experience
  awardExperienceList: z.array(z.string()),
  researchExperienceList: z.array(z.string()),
})

export type TResume = z.infer<typeof resumeSchema>
export type THeaders = z.infer<typeof headersSchema>
export type TEduExperience = z.infer<typeof eduExperienceSchema>

export { resumeSchema, headersSchema, eduExperienceSchema }
