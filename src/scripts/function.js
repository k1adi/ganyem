const checkStorage = () => {
  if(typeof (Storage) === 'undefined'){
    alert('Browser does not support local storage');
    return false;
  }

  return true;
};

export default checkStorage;