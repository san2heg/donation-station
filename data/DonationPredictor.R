#Salaries
Nurse <<-  67490
Accountant <<- 67190
Marketing_Manager <<- 124850
Software_Developer <<- 79530
Doctor <<- 187200
Sales_Manager <<- 113860
Cashier <<- 19310
Physical_Therapist <<- 84020
Dentist <<- 158310
Chemical_Engineer <<- 97360
Civil_Engineer <<- 82220
Electrical_Engineer <<- 95230
Web_Developer <<- 64970
Data_Scientist <<- 113436
Occupational_Therapist <<- 80150
Recruiter <<- 61910
Product_Manager <<- 120152
Finance_Manager <<- 125080
Risk_Manager <<- 125688
MechanicalEngineer <<- 83590
Physican <<- 187200
Physican_Assistant <<- 98180
Politician <<- 174000
Teacher <<- 58950
Music_Artist <<- 32193
Tax_Manager <<- 120397
Surgeon <<- 187500
Secretary <<- 36500
Security_Guard <<- 24680
Actor <<- 52000
Bartender <<- 19530
Paramedic <<- 31980
Geologist <<- 89700
Lawyer <<- 115820
Professor <<- 72470
Pilot <<- 102250
Police_Officer <<- 60270
Soldier <<- 33624
Writer <<- 60250
Flight_Attendant <<- 44860
Economist <<- 99180
Chef <<- 41500
Driver <<- 41260
Orthodontist <<- 208000
Psychologist <<- 72580
Farmer <<- 64170
Social_Worker <<- 45900
Pharmacist <<- 115000

#Global Constants
FEMALE <<- 0 
PREV_DONOR <<- 1

#Import data
data <- read.csv("mock_data - processed_data.csv",header=T)
first_name <- as.character(data[[1]])
last_name <- as.character(data[[2]])
gender <- as.integer(data[[3]])
prev_donor <- as.integer(data[[4]])
is_bilingual <- as.integer(data[[5]])
occupation <- as.character(data[[6]])
age <- as.integer(data[[7]])

#Preallocate
score <- rep(NA, 1000)
donation <- rep(NA, 1000)
flips <- rep(NA, 1000)

calcDonationScore <- function(gender, prevDonor, occupation, age){
        genderWeight <- 0.05
        prevDonorWeight <- 0.10
        occupationWeight <- 0.9
        ageWeight <- 0.15
        randomWeight <- runif(1, -0.05, 0.05)

        #https://www.thirdsector.co.uk/women-likely-donate-men-iof-study-finds/fundraising/article/1442144
        #Female = 0, Male = 1
        if(gender == FEMALE){
                genderWeight <- genderWeight * 0.54
        } else {
                genderWeight <- genderWeight * 0.40
        }
        #
        if(prevDonorWeight == PREV_DONOR){
                prevDonorWeight <- prevDonorWeight * 0.65
        } else {
                prevDonorWeight <- prevDonorWeight * 0.35
        }
        
        #https://www.usatoday.com/story/money/taxes/2018/07/06/how-much-average-taxpayer-give-charity-taxes-2018/36561381/
        if(occupation < 30000){
                occupationWeight <- occupationWeight * 0.05
        } else if (occupationWeight < 50000){
                occupationWeight <- occupationWeight * 0.23
        } else if (occupationWeight < 75000){
                occupationWeight <- occupationWeight * 0.33
        } else if (occupationWeight < 90000){
                occupationWeight <- occupationWeight * 0.46
        } else if (occupationWeight < 110000){ 
                occupationWeight <- occupationWeight * 0.61
        } else if (occupationWeight < 130000){
                occupationWeight <- occupationWeight * 0.70
        } else {
                occupationWeight <- occupationWeight * 0.81
        }
        
        #https://www.statista.com/statistics/292936/giving-to-charity-in-england-uk-y-on-y-by-age/
        if(age < 24){
                ageWeight <- ageWeight * 0.10
        } else if(age < 34){
                ageWeight <- ageWeight * 0.35
        } else if(age < 49){
                ageWeight <- ageWeight * 0.67
        } else if(age < 64){
                ageWeight <- ageWeight * 0.80
        } else if(age < 74){
                ageWeight <- ageWeight * 0.78
        } else {
                ageWeight <- ageWeight * 0.83
        }
        
        total <- genderWeight + prevDonorWeight + occupationWeight + ageWeight + randomWeight
        
        return (total)
}

for(i in 1:1000){
        score[i] <- calcDonationScore(gender[i], prev_donor[i], occupation[i], age[i])
        #flips[i] <- sample(c(0,1), 
        #                size = 1, 
        #               replace = TRUE, 
        #                prob = c(1 - score[i],score[i]))
}

for(i in 1:1000){
        if(score[i] > quantile(score, .375)){
                donation[i] <- 1
        } else {
                donation[i] <- 0
        }
}


#Write to CSV
output <- cbind(score, donation)
write.csv(output, file = "output.csv", quote = FALSE)


