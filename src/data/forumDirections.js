/** Варианты направления форума в форме регистрации */
export const forumDirectionOptions = [
  { value: 'tech', label: 'Технологии и инновации' },
  { value: 'social', label: 'Социальный бизнес' },
  { value: 'business', label: 'Малый бизнес' },
  { value: 'wellness', label: 'Красота и здоровье' },
  { value: 'fashion', label: 'Мода' },
  { value: 'craft', label: 'Мастера' },
  { value: 'media', label: 'Медиа' },
  { value: 'svo', label: 'СВОя волна (секция для участников СВО)' },
]

export function getForumDirectionLabel(value) {
  return forumDirectionOptions.find((item) => item.value === value)?.label ?? ''
}
