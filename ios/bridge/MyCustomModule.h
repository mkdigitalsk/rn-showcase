#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(MyCustomModule, NSObject)

RCT_EXTERN_METHOD(sayHello:(NSString *)name)

@end
