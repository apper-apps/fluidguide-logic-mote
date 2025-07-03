import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { vehicleService } from "@/services/api/vehicleService";

const Sidebar = () => {
  const [recentVehicles, setRecentVehicles] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    loadRecentVehicles();
  }, []);

  const loadRecentVehicles = () => {
    const recent = vehicleService.getRecentVehicles();
    setRecentVehicles(recent);
  };

const handleVehicleClick = (vehicle) => {
    // Trigger vehicle selection event
    if (typeof window !== 'undefined' && window.CustomEvent) {
      window.dispatchEvent(new CustomEvent('selectRecentVehicle', { detail: vehicle }));
    }
  };
  return (
    <motion.aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-xl border-r border-gray-200 z-40 transform transition-transform duration-300 ${
        isCollapsed ? 'w-16' : 'w-80'
      } lg:translate-x-0 ${isCollapsed ? '' : 'lg:w-80'}`}
      initial={false}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-gray-800">Recent Vehicles</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <ApperIcon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto">
        {recentVehicles.length === 0 ? (
          <div className={`text-center py-8 ${isCollapsed ? 'hidden' : ''}`}>
            <ApperIcon name="Clock" className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No recent vehicles</p>
            <p className="text-gray-400 text-xs mt-1">Search for vehicles to see them here</p>
          </div>
        ) : (
          recentVehicles.map((vehicle, index) => (
            <motion.div
              key={`${vehicle.brand}-${vehicle.model}-${vehicle.year}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border border-gray-200 hover:border-accent hover:bg-accent/5 cursor-pointer transition-all duration-200 ${
                isCollapsed ? 'px-2' : ''
              }`}
              onClick={() => handleVehicleClick(vehicle)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <ApperIcon name="Car" className="w-4 h-4 text-white" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {vehicle.brand} {vehicle.model}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {vehicle.year} • {vehicle.engineType}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-success to-info rounded-lg flex items-center justify-center">
              <ApperIcon name="Info" className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Quick Access</p>
              <p className="text-xs text-gray-600">Click any recent vehicle to reload</p>
            </div>
          </div>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;