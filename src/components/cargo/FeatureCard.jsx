export default function FeatureCard({ number, title, description, image, reverse = false }) {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center rounded-2xl bg-[rgba(255,255,255,0.25)] backdrop-blur-[15px] overflow-hidden min-h-[50vh] bg-gray-900">
      <div className={`p-8 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">
            <span className="text-[100px] font-bold text-gray-400">{number}</span> {title}
          </h2>
          <p className="text-gray-200 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className={`h-full ${reverse ? 'md:order-1' : 'md:order-2'}`}>
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
} 