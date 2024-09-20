import { Synchronization } from './synchronization'

export function MainFeature() {
  return (
    <div className="py-20 text-center p-5 flex justify-center items-center min-h-[70vh]">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight transition-colors first:mt-0">
          Accelerate your development
        </h2>
        <p className="text-xl leading-7 text-muted-foreground mt-3">
          Present your design system in a single source of truth
          <br /> and keep it synchronized in real time, for everybody
        </p>
        <div className="max-w-xl m-auto my-20 p-1">
          <Synchronization />
        </div>
      </div>
    </div>
  )
}
