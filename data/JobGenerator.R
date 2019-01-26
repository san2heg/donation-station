#Random job generator

#Import Jobs
data <- read.csv("Data_Research-HAW.csv",header=F)
jobs <- as.character(data[[1]])

#Preallocate
randomJob <- rep(NA, 1000)

#Assign Random Job
for (i in 1:1000){
        index <- sample(1:48, 1)
        randomJob[i] <- jobs[index]
}

#Write to CSV
write.csv2(randomJob, file = "output.csv", col.names = FALSE, quote = FALSE, sep = ",")