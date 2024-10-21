export enum TireCondition {
  NOVO = "NOVO",
  RECUPERADO = "RECUPERADO",
  DANIFICADO = "DANIFICADO",
  DESCARTE = "DESCARTE",
}

export type TTireCondition = keyof typeof TireCondition;

export enum TireLocation {
  ESTOQUE = "ESTOQUE",
  RECUPERACAO = "RECUPERACAO",
  APLICADO = "APLICADO",
}

export type TTireLocation = keyof typeof TireLocation;