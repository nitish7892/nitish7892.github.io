data <- read.csv("vgsales.csv")

library(dplyr)

genre_groupings <- data %>% group_by(Genre) %>% summarise(sum(Global_Sales))

colnames(genre_groupings) <- c("Genre",
                               
                               "Total")
genre_groupings <- genre_groupings[order(-genre_groupings$Total),]


write.csv(genre_groupings,"Genre_Overall.csv",row.names = F)
 




genre_groupings <- data %>% group_by(Genre) %>% summarise(sum(NA_Sales),sum(EU_Sales),sum(JP_Sales),sum(Other_Sales),sum(Global_Sales))

colnames(genre_groupings) <- c("Genre","NA_Sales",
                               "EU_Sales",
                               "JP_Sales",
                               "Other_Sales",
                               "Total")
genre_groupings <- genre_groupings[order(-genre_groupings$Total),]

genre_groupings <- genre_groupings[-6]

write.csv(genre_groupings,"Genre_Over_group.csv",row.names = F)


genre_groupings <- data %>% group_by(Publisher) %>% summarise(sum(NA_Sales),sum(EU_Sales),sum(JP_Sales),sum(Other_Sales),sum(Global_Sales))

colnames(genre_groupings) <- c("Publisher","NA_Sales",
                               "EU_Sales",
                               "JP_Sales",
                               "Other_Sales",
                               "Total")
genre_groupings <- genre_groupings[order(-genre_groupings$Total),]

genre_groupings <- genre_groupings[1:10,-6]


write.csv(genre_groupings,"Publisher_Overallgroupings_top10.csv",row.names = F)



genre_groupings <- data %>% group_by(Platform) %>% summarise(sum(NA_Sales),sum(EU_Sales),sum(JP_Sales),sum(Other_Sales),sum(Global_Sales))

colnames(genre_groupings) <- c("Platform","NA_Sales",
                               "EU_Sales",
                               "JP_Sales",
                               "Other_Sales",
                               "Total")
genre_groupings <- genre_groupings[order(-genre_groupings$Total),]

genre_groupings <- genre_groupings[1:10,-6]


write.csv(genre_groupings,"Platform_Overallgroupings_top10.csv",row.names = F)

genre_groupings <- data %>% group_by(Year,Platform) %>% summarise(n())

genre_groupings <- genre_groupings[!is.na(genre_groupings$Year),]

genre_groupings <- genre_groupings[genre_groupings$Year != "N/A",]
colnames(genre_groupings) <- c("Release_Year",
                               "Platform",
                               "Count")

write.csv(genre_groupings,"Release_Year_Platform_count",row.names = F)



genre_groupings <- data %>% group_by(Year,Publisher) %>% summarise(n())

genre_groupings <- genre_groupings[!is.na(genre_groupings$Year),]

genre_groupings <- genre_groupings[genre_groupings$Year != "N/A",]
colnames(genre_groupings) <- c("Release_Year",
                               "Publisher",
                               "Count")

write.csv(genre_groupings,"Release_Year_Publisher_count",row.names = F)




genre_groupings <- data %>% group_by(Year,Genre) %>% summarise(n())

genre_groupings <- genre_groupings[!is.na(genre_groupings$Year),]

genre_groupings <- genre_groupings[genre_groupings$Year != "N/A",]
colnames(genre_groupings) <- c("Release_Year",
                               "Genre",
                               "Count")

write.csv(genre_groupings,"Release_Year_Genre_count",row.names = F)


