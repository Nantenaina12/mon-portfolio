import { config } from "../data/config"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">{config.name}</h1>
        <h2 className="text-2xl text-gray-600 mb-4">{config.title}</h2>
        <p className="text-lg text-gray-500">{config.tagline}</p>
      </div>
    </section>
  )
}