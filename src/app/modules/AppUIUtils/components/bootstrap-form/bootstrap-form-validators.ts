export class BootstrapFormValidator {
  protected error:string   = '';
  protected fieldConfig:any = null;
  protected params:any = {};
  protected extraValidator:any = null;

  protected min:any = null;
  protected max:any = null;
  protected minSeted:boolean = false;
  protected maxSeted:boolean = false;
  protected enabledInContexts:string[] = [];
  protected validationByPass:boolean = false;

  constructor( p:any = {} ){
    this.params = p;
    if ( p.hasOwnProperty( 'extraValidator' ) ){
      this.extraValidator = p.extraValidator;
    }

    if ( p.hasOwnProperty( 'enabledInContexts' ) ){
      this.enabledInContexts = p.enabledInContexts;
    }

    if ( p.hasOwnProperty( 'min' ) ){
      this.minSeted = true;
      this.min = p.min;
    }

    if ( p.hasOwnProperty( 'max' ) ){
      this.maxSeted = true;
      this.max = p.max;
    }
  }

  setFieldObject( fo:any ){
    this.fieldConfig = fo;
    if ( this.extraValidator !== null ){
      this.extraValidator.setFieldObject( fo );
    }
  }

  getContext(){
    if ( this.fieldConfig !== null){
      return this.fieldConfig.getContext();
    }
    return '';
  }

  validate(){
    this.setFieldError( false );
    //si se definió que la validación solo se aplique en algunos conextos determinados y que en
    // otros sea opcional
    if ( this.fieldConfig !== null && this.enabledInContexts.length > 0 ){
      let encontrado:boolean = false;
      let context:string     = this.getContext();
      for ( let c=0; c < this.enabledInContexts.length; c++ ){
        if ( this.enabledInContexts[c] == context ){
          encontrado = true;
        }
      }
      //Si la validación no esta habilitada en este contexto, retornamos true
      if (!encontrado){
        this.validationByPass = true;
        return true;
      }
    }

    if ( this.extraValidator !== null ){
      let result:any = this.extraValidator.validate();
      this.error = this.extraValidator.getErrors();
      return result;
    }

    return true;
  }

  setFieldError( v:boolean, errorText:string = '' ){
    this.fieldConfig.onError = v;
    this.fieldConfig.errorText = errorText;
    this.error = errorText;
  }

  getErrors(){
    return this.error;
  }

}

export class BootstrapFormRequired extends BootstrapFormValidator {

  constructor( p:any={} ){
    super( p );
  }

  validate(){
    //Se llama al otro validador pasado como parametro (en caso de encadenar varios)
    //Si se obtiene resultado positivo y se habilita la propiedad bypass se debe
    //esquivar el resto
    if (!super.validate()){
      this.setFieldError( true, super.getErrors() );
      return false;
    } else {
      if ( this.validationByPass ){
        return true;
      }
    }

    let formConfig:any = this.fieldConfig.getFormConfig();
    if ( formConfig.model[ this.fieldConfig.field ] == ''
      || formConfig.model[ this.fieldConfig.field ] == undefined
      || formConfig.model[ this.fieldConfig.field ] == null )
    {
      this.setFieldError( true, 'El campo ' + this.fieldConfig.title + ' es requerido.' );
      return false;
    }

    return true;
  }

}

export class BootstrapFormNumber extends BootstrapFormValidator {

  constructor( p:any={} ){
    super( p );
  }

  validate(){
    //Se llama al otro validador pasado como parametro (en caso de encadenar varios)
    //Si se obtiene resultado positivo y se habilita la propiedad bypass se debe
    //esquivar el resto
    if (!super.validate()){
      this.setFieldError( true, super.getErrors() );
      return false;
    } else {
      if ( this.validationByPass ){
        return true;
      }
    }

    this.setFieldError( false );
    let formConfig:any = this.fieldConfig.getFormConfig();

    if ( formConfig.model[ this.fieldConfig.field ] === '' || isNaN( formConfig.model[ this.fieldConfig.field ] )  ) {
      this.setFieldError( true, 'El campo ' + this.fieldConfig.title + ' solo acepta números.' );
      return false;
    }

    if ( this.minSeted && (formConfig.model[ this.fieldConfig.field ] < this.min ) ) {
      this.setFieldError( true, 'El campo ' + this.fieldConfig.title + ' acepta números mayores a '+ this.min );
      return false;
    }

    if ( this.maxSeted && (formConfig.model[ this.fieldConfig.field ] > this.max ) ) {
      this.setFieldError( true, 'El campo ' + this.fieldConfig.title + ' acepta números menores a '+ this.max );
      return false;
    }

    return true;
  }

}

export class BootstrapFormDate extends BootstrapFormValidator {

  constructor( p:any={} ){
    super( p );
  }

  validate(){
    //Se llama al otro validador pasado como parametro (en caso de encadenar varios)
    //Si se obtiene resultado positivo y se habilita la propiedad bypass se debe
    //esquivar el resto
    if (!super.validate()){
      this.setFieldError( true, super.getErrors() );
      return false;
    } else {
      if ( this.validationByPass ){
        return true;
      }
    }
    
    this.setFieldError( false );
    let formConfig:any = this.fieldConfig.getFormConfig();

    if ( this.minSeted && (new Date(formConfig.model[ this.fieldConfig.field ]).getTime() < this.min.getTime() ) ) {
      this.setFieldError( true, 'Revise ' + this.fieldConfig.title + ' debe ingresar una fecha mayor');
      return false;
    }

    if ( this.maxSeted && (new Date(formConfig.model[ this.fieldConfig.field ]).getTime() > this.max.getTime() ) ) {
      this.setFieldError( true, 'Revise ' + this.fieldConfig.title + ' debe ingresar una fecha menor' );
      return false;
    }

    return true;
  }

}
