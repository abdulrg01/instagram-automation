import { Building2, Truck, Users } from "lucide-react"

export default function CompanyMilestones() {
  return (
    <div className="container bg-white mx-auto px-4 py-12 relative overflow-hidden">
      {/* Background illustration */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 z-0">
        <div className="w-full h-full border-2 border-blue-900/20">
          <svg viewBox="0 0 400 600" className="w-full h-full text-blue-900">
            <path
              d="M50,50 L350,50 L350,350 C350,400 300,450 250,450 L50,450 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="100" cy="200" r="10" fill="currentColor" />
            <circle cx="300" cy="300" r="10" fill="currentColor" />
            <circle cx="200" cy="400" r="10" fill="currentColor" />
            <path d="M100,100 L300,100 L300,300 L100,300 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="50" y1="500" x2="350" y2="500" stroke="currentColor" strokeWidth="2" />
            <line x1="100" y1="450" x2="100" y2="550" stroke="currentColor" strokeWidth="2" />
            <line x1="200" y1="450" x2="200" y2="550" stroke="currentColor" strokeWidth="2" />
            <line x1="300" y1="450" x2="300" y2="550" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h3 className="text-gray-500 text-lg mb-2">Company Milestones</h3>
        <div className="w-16 h-1 bg-[#035e85] mx-auto mb-6"></div>
        <h2 className="text-5xl font-bold text-blue-900">Our Company In Numbers</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {/* Card 1 */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4">
            <Building2 className="w-12 h-12 text-blue-900" />
          </div>
          <h2 className="text-6xl font-bold text-blue-900 mb-2">100+</h2>
          <h3 className="text-2xl font-semibold text-[#035e85] mb-4">Pharmacies</h3>
          <p className="text-gray-800">A Network of Over 100 Pharmacies Outlets Spanning 5 states of Nigeria.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4">
            <Truck className="w-12 h-12 text-blue-900" />
          </div>
          <h2 className="text-6xl font-bold text-blue-900 mb-2">150+</h2>
          <h3 className="text-2xl font-semibold text-[#035e85] mb-4">Diverse Fleet</h3>
          <p className="text-gray-800">
            Our fleet comprises over 150 trucks, equipped with capacities from 10,000 to 60,000 liters.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4">
            <Users className="w-12 h-12 text-blue-900" />
          </div>
          <h2 className="text-6xl font-bold text-blue-900 mb-2">2010</h2>
          <h3 className="text-2xl font-semibold text-[#035e85] mb-4">Year Established</h3>
          <p className="text-gray-800">Providing excellence and satisfaction to customers for over 19 years.</p>
        </div>
      </div>
    </div>
  )
}


