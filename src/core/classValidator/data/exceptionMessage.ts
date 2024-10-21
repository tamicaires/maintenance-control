export const ExceptionMessage = {
  IsNotEmpty: (property: string) => `Campo ${property} é obrigatório`,
  IsEmail: (property: string) => `Campo ${property} deve ser um email`,
  IsDate: (property: string) => `Campo ${property} deve ser uma Data`,
  IsString: (property: string) =>
    `Campo ${property} deve estar no formato string`,
  MinLength: (min: number, property: string) =>
    `Campo ${property} precisa ter ${min} caracteres`,
};
