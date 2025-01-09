type MyCustomModuleType = {
  returnValueTest: (param: number) => Promise<number>;
  sayHello: (name: string) => Promise<string>;
};

declare module 'react-native' {
    interface NativeModulesStatic {
      MyCustomModule: MyCustomModuleType;
    }
  }

export {};