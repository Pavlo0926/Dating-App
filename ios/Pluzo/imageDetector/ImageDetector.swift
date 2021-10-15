//
//  ImageDetector.swift
//  Pluzo
//
//  Created by new830 on 11/17/20.
//

import UIKit
import CoreML
import Vision

@objc(ImageDetector)
class ImageDetector: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func check(_ imageUri: String, callback: @escaping RCTResponseSenderBlock) {
    let config = MLModelConfiguration()
    guard #available(iOS 12.0, *), let model = try? VNCoreMLModel(for: NSFWDetector(configuration: config).model) else {
      return
    }
    
    let request = VNCoreMLRequest(model: model) { request, error in
      let results = request.results?.first as? VNClassificationObservation
      print(results?.identifier ?? "Error")
      callback([results?.identifier ?? "Error"])
    }
    
    if let image = UIImage(contentsOfFile: imageUri) {
      let handler = VNImageRequestHandler(cgImage: image.cgImage!)
      DispatchQueue.global(qos: .userInteractive).async {
        do {
          try handler.perform([request])
        } catch {
          callback(["Failed"])
        }
      }
    }
  }
  
}
