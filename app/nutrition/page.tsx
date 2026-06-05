import type { Metadata } from 'next'
import NutritionClient from './NutritionClient'

export const metadata: Metadata = {
  title: 'Nutrition Musculation — Recettes par Objectif',
  description: 'Découvrez des recettes réelles adaptées à votre objectif : sèche, prise de masse ou maintien. Données nutritionnelles complètes, liées à Matbakh360.',
}

export default function NutritionPage() {
  return <NutritionClient />
}
