import React from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

const companyName = 'Tecplore';

const AboutPage = () => {
  const stats = [
    { value: "98%", label: "Project Delivery Rate" },
    { value: "92%", label: "Client Retention Rate" },
    { value: "35%", label: "Annual Revenue Growth" },
    { value: "15+", label: "Countries Reached" },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Coming Soon",
      role: "CEO & Founder",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "COO",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "CTO",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "Full-Stack Developer",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "UI/UX Designer",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "Lead Software Engineer",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "Cybersecurity Specialist",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "Network Administrator",
      imageUrl: "/api/placeholder/400/400"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20">
            {/* Hexagonal pattern overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-80" />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Upper Text Section */}
          <div className="container mx-auto px-4 pt-32 pb-16">
            <h1 className="text-6xl font-bold mb-6 max-w-4xl">
              We Empower <span className="text-gray-400">Innovation</span>, and help{" "}
              <span className="text-gray-400">Simplify</span> Technology.
            </h1>
            <p className="text-xl max-w-2xl text-gray-300">
              At {companyName}, we transform ideas into reality with cutting-edge tech solutions
              tailored to your needs.
            </p>
          </div>

          {/* Split Image Section */}
          <div className="grid grid-cols-2 gap-0 h-96">
            <div className="relative overflow-hidden">
              <Image 
                src="/photos/aboutus/2.jpg" 
                alt="VR Technology"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
            <div className="relative overflow-hidden">
              <Image 
                src="/photos/aboutus/3.jpg" 
                alt="AR Technology"
                fill
                className="object-cover grayscale"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
          </div>

          {/* Who We Are Section */}
          <div className="bg-white text-black">
            <div className="container mx-auto px-4 py-24">
              <div className="flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/4">
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Who We Are</div>
                  <h2 className="text-4xl font-bold">
                    Meet {companyName}: Where Technology Meets Vision Through Innovation and Collaboration
                  </h2>
                </div>
                <div className="lg:w-3/4">
                  <p className="text-gray-600 mb-16 text-lg">
                  {companyName} is a forward-thinking technology company dedicated to delivering exceptional
                    IT services, software development, and consulting to businesses worldwide. Founded
                    in 2015, we&apos;ve grown from a small startup into a trusted partner for clients across
                    various industries, including healthcare, finance, and education.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                      <div key={index}>
                        <div className="text-4xl font-bold text-black mb-2">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-black">Our Mission</h3>
                      <p className="text-gray-600">
                        To empower businesses and individuals by providing innovative, reliable, and
                        user-friendly technology solutions that drive growth and success.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-black">Our Values</h3>
                      <p className="text-gray-600">
                        We prioritize creativity, integrity, collaboration, and excellence, delivering
                        solutions that exceed expectations and foster lasting partnerships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4">
              The <span className="text-gray-400">Brains</span> Behind Logic
            </h2>
            <p className="text-gray-300">
              Our talented team combines expertise and creativity to bring innovative ideas 
              to life and deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative aspect-square mb-4 overflow-hidden bg-zinc-800 rounded-lg">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8">Join Our Team!</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              We&apos;re looking for talented individuals to help us drive innovation. Explore our
              open positions and become a part of Logic today!
            </p>
            <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors">
              See Open Positions →
            </button>
          </div>

          {/* CEO Quote */}
          <div className="mt-24 max-w-3xl mx-auto text-center">
            <blockquote className="text-xl text-gray-300 mb-8">
            &quot;At Tecplore, our goal is simple: to empower businesses with innovative technology
              that drives growth and success. We aim to be a trusted partner, delivering
              solutions that not only meet today&apos;s needs but also prepare our clients for
              the opportunities of tomorrow.&quot;
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="relative w-12 h-12 mr-4">
                <Image
                  src="/api/placeholder/48/48"
                  alt="Coming Soon"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-semibold">To Be Announced</div>
                <div className="text-sm text-gray-400">CEO & Founder</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;