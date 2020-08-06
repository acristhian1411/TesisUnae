var has_not_error = true;
class validator{
  validated(fields, evento) {
    var resultado = {};
    resultado = this.fieldIsEmpty(fields);
    evento(resultado);
    // console.log(has_not_error);
    return (has_not_error);
  }
  fieldIsEmpty(fields) {
    var res = {};
    var not_error = true;
    for (var i = 0; i < fields.length; i++) {
      if ((Object.values(fields[i])==null || Object.values(fields[i])=='')) {
        res = {...res, [Object.keys(fields[i])[0]]:{
            message:'El campo es obligatorio.',
            error:true,
          }}
          not_error = false;
      }
      else{
        res = {...res, [Object.keys(fields[i])[0]]:{
            message:'',
            error:false,
          }}
      }
    }
    has_not_error =  not_error;
    return res;
  }
}

export default validator;
