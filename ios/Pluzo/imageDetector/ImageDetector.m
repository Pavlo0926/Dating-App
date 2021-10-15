//
//  ImageDetector.m
//  Pluzo
//
//  Created by new830 on 11/17/20.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(ImageDetector, NSObject)

  RCT_EXTERN_METHOD(check:(NSString *)imageUri callback:(RCTResponseSenderBlock) callback)

@end
