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