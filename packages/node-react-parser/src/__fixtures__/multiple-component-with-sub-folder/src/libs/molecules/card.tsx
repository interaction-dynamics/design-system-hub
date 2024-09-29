export type CardProps = {
  title: React.ReactNode
  description: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
}: CardProps) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
)
