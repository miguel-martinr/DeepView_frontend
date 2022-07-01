export interface TophatParameters {
  kernelWidth: number,
  kernelHeight: number,
}

export interface ThresholdParameters {
  thresh: number
}
export interface PreprocessParameters {
  top_hat: TophatParameters,
}

export interface ProcessParameters {
  threshold: ThresholdParameters,
}

export interface ProcessingParameters {
  preprocess: PreprocessParameters,
  process: ProcessParameters,
}



export const defaultParameters: ProcessingParameters = {
  preprocess: {
    top_hat: {
      kernelHeight: 9,
      kernelWidth: 9,
    }
  },

  process: {
    threshold: {
      thresh: 20
    }
  }
}