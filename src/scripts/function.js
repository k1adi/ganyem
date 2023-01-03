const checkStorage = () => {
  if(typeof (Storage) === 'undefined'){
    alert('Browser tidak mendukung local stroage');
    return false;
  }

  return true;
};

export default checkStorage;