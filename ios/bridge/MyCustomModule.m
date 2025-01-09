#import "MyCustomModule.h"

@implementation MyCustomModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sayHello:(NSString *)name)
{
  NSLog(@"Hello, %@", name);
}

@end
