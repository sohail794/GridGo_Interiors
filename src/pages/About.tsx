import { CheckCircle } from 'lucide-react';
import { teamMembers, timeline } from '../data/content';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="pt-20">
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-emerald/80" />
        <div className="relative h-full flex items-center justify-center px-4">
          <h1 className="font-serif italic text-5xl md:text-6xl text-white text-center">
            Two Decades of
            <br />
            <span className="text-silver-light">Inspired Craftsmanship</span>
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl text-emerald mb-8 text-center">Our Story</h2>
          <div className="font-sans text-lg text-charcoal space-y-6 leading-relaxed">
            <p>
              Founded in 2003, GridGo Interiors emerged from a vision to transform ordinary spaces
              into extraordinary environments. With over two decades of dedication to excellence, we
              have established ourselves as India's premier integrated interior services provider.
            </p>
            <p>
              Our journey began with a small team of passionate craftsmen and designers who believed
              that every space tells a story. Today, we are proud to have completed over 200
              projects across India, each one a testament to our commitment to quality,
              innovation, and client satisfaction.
            </p>
            <p>
              What sets GridGo apart is our comprehensive approach to interior design. We don't just
              design spaces; we bring them to life through our expertise in steel fabrication, glass
              applications, marble craftsmanship, bespoke furniture creation, artistic décor, and
              premium painting. This integrated model ensures seamless project execution and
              unparalleled quality control.
            </p>
            <p>
              Our team comprises master craftsmen, innovative designers, and skilled technicians who
              share a common passion: creating spaces that inspire and endure. We work with the
              finest materials sourced globally, combined with time-honored techniques and modern
              technology to deliver results that exceed expectations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-silver-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl text-emerald mb-12 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald hidden md:block" />
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div
                  key={event.year}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="w-full md:w-5/12 mb-4 md:mb-0">
                    {index % 2 === 0 ? (
                      <div className="bg-white p-6 rounded-lg shadow-luxury md:mr-8">
                        <h3 className="font-serif text-2xl text-emerald mb-2">{event.title}</h3>
                        <p className="font-sans text-charcoal">{event.description}</p>
                      </div>
                    ) : (
                      <div className="md:text-right" />
                    )}
                  </div>
                  <div className="relative flex items-center justify-center w-24 h-24 bg-emerald rounded-full border-4 border-white shadow-luxury flex-shrink-0">
                    <span className="font-serif text-xl font-bold text-white">{event.year}</span>
                  </div>
                  <div className="w-full md:w-5/12 mt-4 md:mt-0">
                    {index % 2 !== 0 ? (
                      <div className="bg-white p-6 rounded-lg shadow-luxury md:ml-8">
                        <h3 className="font-serif text-2xl text-emerald mb-2">{event.title}</h3>
                        <p className="font-sans text-charcoal">{event.description}</p>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl text-emerald mb-12 text-center">
            Meet Our Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-silver-light rounded-lg overflow-hidden shadow-luxury">
                {member.image && (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-charcoal mb-2">{member.name}</h3>
                  <p className="font-sans font-semibold text-emerald mb-3">{member.title}</p>
                  <p className="font-sans text-sm text-charcoal">{member.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl text-emerald mb-12 text-center">
            Our Core Principles
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <CheckCircle className="text-emerald mr-4 flex-shrink-0 mt-1" size={28} />
              <div>
                <h3 className="font-sans font-bold text-xl text-charcoal mb-2">
                  1. Creativity & Innovation
                </h3>
                <p className="font-sans text-charcoal">
                  We push boundaries to create unique, inspiring spaces that reflect your vision
                  while incorporating the latest design trends and technologies.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-emerald mr-4 flex-shrink-0 mt-1" size={28} />
              <div>
                <h3 className="font-sans font-bold text-xl text-charcoal mb-2">
                  2. Eco-Conscious Practices
                </h3>
                <p className="font-sans text-charcoal">
                  Sustainability is at the heart of our operations. We source eco-friendly materials
                  and implement practices that minimize environmental impact.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-emerald mr-4 flex-shrink-0 mt-1" size={28} />
              <div>
                <h3 className="font-sans font-bold text-xl text-charcoal mb-2">
                  3. Client Dedication
                </h3>
                <p className="font-sans text-charcoal">
                  Your satisfaction is our priority. We maintain transparent communication,
                  respect timelines, and ensure every detail meets your expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl mb-6 italic">Partner with Us</h2>
          <p className="font-sans text-xl mb-8 text-silver-light">
            Ready to transform your space? Let's discuss your vision and create something
            extraordinary together.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-emerald px-8 py-4 rounded-md font-sans font-bold text-lg hover:bg-silver-light transition-colors"
          >
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
}
