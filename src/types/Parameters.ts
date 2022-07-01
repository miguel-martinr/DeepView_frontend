export interface TophatParameters {
  kernelWidth: number,
  kernelHeight: number,
}

export interface PreprocessParameters {
  top_hat: TophatParameters,
}


export interface ProcessingParameters {
  preprocess: PreprocessParameters,
}



export const defaultParameters: ProcessingParameters = {
  preprocess: {
    top_hat: {
      kernelHeight: 9,
      kernelWidth: 9,
    }
  }
}