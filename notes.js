
/*
pipeline.

[pre processing phase]
[feature extraction phase]
[codebook clustering phase]
[training phase]
[predictions]

pipeline - BASIC

MFCC
train knn model
knn predictions
LSTM
NN

pipeline A. MFCC codebook

high pass
pre-emphasis
MFCC
VQ codebook
calcuate DTW distance for each point to codebook centroids
knn from distance vectors
prediction

pipeline B - refined feature selection
"
chromogram + feature set.
step foward feature selection
feature metrics
"


need for pipes. stream based library.

pluggable tranforms for each stage

streaming data sources.

reduce training time with pre-calcuated datasets.
or use smaller audio samples and generate from scratch *** dynamic experimentation


*/
