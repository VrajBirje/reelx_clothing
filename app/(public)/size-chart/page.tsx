"use client"
import { motion } from "framer-motion"
import { useState } from "react"

const SizeChart = () => {
  const [activeTab, setActiveTab] = useState<'inches' | 'cm'>('inches')

  // Size chart data
  const sizeData = {
    inches: {
      sizes: ['S', 'M', 'L', 'XL'],
      measurements: [
        { name: 'Length', values: [25, 22.5, 26, 28] },
        { name: 'Chest', values: [18.5, 20.5, 21, 23] },
        { name: 'Shoulder', values: [7, 7, 7.5, 8] },
        { name: 'Sleeve Open', values: [15, 15, 15, 16] },
        { name: 'Sleeve Length', values: [7.5, 8, 8.5, 9.5] }
      ]
    },
    cm: {
      sizes: ['S', 'M', 'L', 'XL'],
      measurements: [
        { name: 'Length', values: [63.5, 57.2, 66, 71.1] },
        { name: 'Chest', values: [47, 52.1, 53.3, 58.4] },
        { name: 'Shoulder', values: [17.8, 17.8, 19.1, 20.3] },
        { name: 'Sleeve Open', values: [38.1, 38.1, 38.1, 40.6] },
        { name: 'Sleeve Length', values: [19.1, 20.3, 21.6, 24.1] }
      ]
    }
  }

  const currentData = sizeData[activeTab]

  return (
    <div className="bg-black text-white p-8 max-w-4xl mx-auto">
      <motion.h2 
        className="text-3xl font-bold mb-6 tracking-tight"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        SIZE CHART
      </motion.h2>
      
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'inches' ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
          onClick={() => setActiveTab('inches')}
        >
          Inches
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'cm' ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
          onClick={() => setActiveTab('cm')}
        >
          Centimeters
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium">Measurement</th>
                {currentData.sizes.map((size, index) => (
                  <motion.th 
                    key={size}
                    className="text-center py-3 px-4 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {size}
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.measurements.map((row, rowIndex) => (
                <motion.tr 
                  key={row.name}
                  className="border-b border-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + rowIndex * 0.05 }}
                >
                  <td className="py-3 px-4 font-medium">{row.name}</td>
                  {row.values.map((value, colIndex) => (
                    <td 
                      key={`${row.name}-${colIndex}`} 
                      className="text-center py-3 px-4"
                    >
                      {value}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="mb-2">• Model is 6'2" (188cm) wearing size L</p>
        <p>• Measurements may vary by ±0.5{activeTab === 'inches' ? ' inches' : ' cm'}</p>
      </motion.div>
    </div>
  )
}

export default SizeChart