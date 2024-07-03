export const BusinessCard = () => {
  return (
    <div className="flex w-full h-22 bg-gradient-to-r from-secondary-light-blue to-main-blue/70 rounded-lg">
      <div className="grid justify-items-center items-center p-4">
        <span className="grid justify-items-center items-center w-14 h-14 rounded-full bg-white">
          Img
        </span>
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-third-blue font-light">Negocio</div>
        <div className="text-cadet-grey">Ver el perfil &gt; </div>
      </div>
    </div>
  );
};
