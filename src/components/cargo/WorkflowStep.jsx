const WorkflowStep = ({ iconClass, title, description }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-blue-900/60 rounded-lg"></div>
      <div className="relative h-64 bg-cover bg-center rounded-lg p-6 text-white">
        <div className="w-12 h-12 mb-4">
          <div className={iconClass + " w-full h-full"}></div>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm mb-1">{description}</p>
      </div>
    </div>
  );
};

export default WorkflowStep; 