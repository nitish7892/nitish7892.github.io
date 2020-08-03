data <- read.csv("vgsales.csv")

library(dplyr)
genre_groupings <- data %>% group_by(Genre) %>% summarise(sum(NA_Sales),sum(EU_Sales),sum(JP_Sales),sum(Other_Sales),sum(Global_Sales))

colnames(genre_groupings) <- c("Genre","NA_Sales",
                               "EU_Sales",
                               "JP_Sales",
                               "Other_Sales",
                               "Total")
genre_groupings <- genre_groupings[order(-genre_groupings$Total),]

genre_groupings <- genre_groupings[-6]

write.csv(genre_groupings,"Genre_Overallgroupings.csv",row.names = F)


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




