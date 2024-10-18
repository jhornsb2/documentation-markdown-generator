// TODO move these to a separate file

/**
 * This is the interface that is used to represent a package in the code.
 */
export interface Package {
  name: string;
}

/**
 * This is the interface that is used to represent the modifiers of an element in the code.
 */
export interface Modifiers {
  /**
   * Whether the element is static.
   */
  isStatic: boolean;
  /**
   * Whether the element is final.
   */
  isFinal: boolean;
  /**
   * Whether the element is abstract.
   */
  isAbstract: boolean;
  /**
   * The visibility of the element.
   */
  visibility: 'public' | 'private' | 'protected' | 'default';
}

/**
 * This is the interface that is used to represent a member of a type in the code.
 */
export interface TypeMember {
  /**
   * The name of the member.
   */
  name: string;
  /**
   * The modifiers of the member.
   */
  modifiers: Modifiers;
}

/**
 * This is the interface that is used to represent a field in the code.
 */
export interface Field extends TypeMember {
  /**
   * The type of the field.
   */
  type: Type;
}

/**
 * This is the interface that is used to represent a parameter in the code.
 */
export interface Parameter {
  /**
   * The name of the parameter.
   */
  name: string;
  /**
   * The type of the parameter.
   */
  type: Type;
}

/**
 * This is the interface that is used to represent a method in the code.
 */
export interface Method extends TypeMember {
  /**
   * The return type of the method.
   */
  returnType: Type;
  /**
   * The parameters of the method.
   */
  parameters: Parameter[];
}

/**
 * This is the interface that is used to represent a type in the code. This can be a class, interface, enum, etc.
 */
export interface Type {
  /**
   * The package that the type belongs to.
   */
  package: Package;
  /**
   * The name of the type.
   */
  name: string;
  /**
   * The modifiers of the type.
   */
  modifiers: Modifiers;
  /**
   * The type of the type. This can be a class, interface, enum, etc.
   */
  type: 'class' | 'interface' | 'enum' | 'annotation';
  /**
   * The super classes of the type. This is only applicable if the type is a class.
   */
  superClasses: Type[];
  /**
   * The interfaces that the type implements. This is only applicable if the type is a class or interface.
   */
  interfaces: Type[];
}

/**
 * This is the interface that is used to represent the details of a type.
 */
export interface TypeDetails {
  /**
   * The core type information.
   */
  type: Type;
  /**
   * The components of the type. This can be fields, methods, etc.
   */
  typeMembers: TypeMember[];
}

/**
 * This is the interface that is used to represent an import in the code.
 */
export interface Import {
  /**
   * The fully qualified name of the import. Example: java.util.List or java.util.*
   */
  value: string;
}

/**
 * This is the interface that is used to represent the result of the code parser.
 */
export interface ParsedCodeFile {
  /**
   * The imports of the code.
   */
  imports: Import[];
  /**
   * The types of the code. For languages like Java, there will be only one type per file. For languages like Python,
   * there can be multiple types per file.
   */
  types: Type[];
}

/**
 * This is the interface that all language handlers must implement. It defines the methods that the code parser will
 * use to parse the code for that language.
 */
export interface LanguageHandler {
  /**
   * Parses the provided code and returns the imports.
   *
   * @param code The code to parse
   */
  parseImports(code: string): Import[];

  /**
   * Parses the provided code and returns the classes.
   *
   * @param code The code to parse
   */
  parseTypes(code: string): Type[];
}

// end TODO

export class CodeParser {
  constructor(private readonly languageHandler: LanguageHandler) {}

  /**
   * Parses the provided code.
   * @param code The code to parse. This is expected to be the entire code of a file.
   */
  parseCode(code: string): ParsedCodeFile {
    // get the imports
    const imports: Import[] = this.languageHandler.parseImports(code);
    // get the classes
    const types: Type[] = this.languageHandler.parseTypes(code);

    return {
      imports,
      types,
    };
  }
}
