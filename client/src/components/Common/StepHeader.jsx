import "./StepHeader.css";

function StepHeader({

  icon,

  title,

  subtitle,

}) {

  return (

    <div className="step-header">

      <div className="step-header-icon">

        {icon}

      </div>

      <div>

        <h2>{title}</h2>

        <p>{subtitle}</p>

      </div>

    </div>

  );

}

export default StepHeader;