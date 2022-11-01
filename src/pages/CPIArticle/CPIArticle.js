import * as d3 from 'd3';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import toydata from '../../data/toydata.json'
import './CPIArticle.css'
import Highlighter from 'react-highlight-words';
import NYTHeader from '../../images/NYT-unemploy/NYTHeader.png'
import NYTGraph1 from '../../images/NYT_cpi/NYTGraph1.png'

function CPIArticle() {
    
    const highlight = []
    const [dataRef, setDataRef] = useState([]);


    toydata.references.forEach((item) => highlight.push(item.sentence))
    console.log(highlight)
    console.log(dataRef)

    const clickhighlight = (sentence) => {
        toydata.references.forEach((item) => {
            if (item.sentence == sentence.trim()) {
                setDataRef(item.dataReferences);
            }
        })
    }

    const dataFilter = () => {
        const newRef = []
        if (dataRef.length > 0) {
            dataRef.forEach((item) => {
                const newdata = {}
                // const fetch_data = axios.get(item.data).then(response => response.data)
                const filter_data = axios.get(item.data).then(response => response.data.observations.map((data) => {
                    return {
                        date: data.date,
                        measurement: data.value
                    }
                }))
                newdata.dataReference = item.dataReference
                newdata.dataName = item.dataName
                newdata.xUnit = item.xUnit
                newdata.yUnit = item.yUnit
                newdata.data = filter_data
                newRef.push(newdata)
            })
        }
        return newRef;
    }
    
    console.log(dataFilter());


    const draw = () => {
        const timeConv = d3.timeParse("%M");

    }


    return (
    <div>
        <img src={NYTHeader} width='100%' />
        <div className='g-name'>Consumer Prices Are Still Climbing Rapidly</div>
        <div className='g-details'>Inflation data showed a slowdown in annual price increases in April, but a closely watched monthly price measure continues to rise at an uncomfortably brisk rate. </div>
        
        <img src={NYTGraph1} width='100%' />
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The pressures that have kept inflation elevated for months remain strong, fresh data released Wednesday showed, a challenge for households that are trying to shoulder rising expenses and for the White House and Federal Reserve as they try to put the economy on a steadier path."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Annual inflation moderated for the first time in months in April, but the Consumer Price Index still increased 8.3 percent, an uncomfortably rapid pace. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="At the same time, a closely watched measure that subtracts food and fuel costs actually accelerated."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Core inflation — which excludes costs for groceries and gas — picked up 0.6 percent in April from the prior month, faster than its 0.3 percent increase in March. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="That measure is particularly important for policymakers, who use it as a gauge to help determine where inflation is headed."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="While the letup in annual inflation may have given President Biden and the Fed a dose of comfort, the overall picture remains worrying. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="Policymakers have a long way to go to bring price increases down to more normal and stable levels, and the newest data is likely to keep them focused on trying to slow an inflation rate that remains near its fastest pace in 40 years. "
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="“Inflation is too high — they need to bring it down,” said Laura Rosner-Warburton, senior economist at MacroPolicy Perspectives. “The re-acceleration in core inflation is unwelcome."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The report renewed fears among investors that the Fed could speed up plans to raise interest rates, which would further take steam out of the stock market. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="The S&P 500 fell 1.6 percent, extending a five-week slide that has taken it to the cusp of a so-called bear market — a drop of more than 20 percent from a recent peak. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="At the close of trading, the index was 18 percent below its January record high. The tech-heavy Nasdaq composite, which has been in a bear market for months, fell 3.2 percent."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Annual inflation may have now peaked, having climbed by an even-quicker 8.5 percent in March. "
                onClick={()=>clickhighlight("Annual inflation may have now peaked, having climbed by an even-quicker 8.5 percent in March. ")}
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="It slowed down in April partly because gas prices dropped lower, and partly because of a statistical quirk that will continue through the months ahead. "
                onClick={()=>clickhighlight("It slowed down in April partly because gas prices dropped lower, and partly because of a statistical quirk that will continue through the months ahead. ")}
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="Yearly price changes are now being measured against elevated price readings from last spring, when inflation started to take off. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="The higher base makes annual increases look less severe."
            />
        </div>

        <div></div>

        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Still, even the White House greeted the new report with concern. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="“While it is heartening to see that annual inflation moderated in April, the fact remains that inflation is unacceptably high,” Mr. Biden said in a statement. “Inflation is a challenge for families across the country, and bringing it down is my top economic priority.”"
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Economists do expect price increases to continue to ebb somewhat this year, because they think that consumer demand will taper off and that supply chain stresses will ease. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="The crucial question is how much and how quickly that moderation might happen."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Many analysts have been predicting a slowdown in price increases or even outright price cuts on many goods, but those forecasts look increasingly uncertain. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="Lockdowns in China and the war in Ukraine threaten to exacerbate supply shortages for semiconductor chips, commodities and other important products."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="There are persistent issues in supply chains,” said Matthew Luzzetti, chief U.S. economist at Deutsche Bank. “And the most recent developments have not been positive."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The path ahead for the car market, for instance, remains unclear. Supply shortfalls for used vehicles show some signs of easing, but shortfalls persist in computer chips, which are crucial to automobile production. As a result, companies are still struggling to complete vehicles."
            />
        </div> 
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Prices for used cars and trucks declined in April from the prior month, though the drop was smaller than the one in March. While car parts had become cheaper in March, they resumed their monthly increase in April. New car prices also accelerated after a lull, climbing 1.7 percent from the prior month."
            />
        </div>
        
        <div></div>
        
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="And services prices are now increasing quickly, as rents climb and as worker shortfalls lead to higher wages and steeper prices for restaurant meals and other labor-intensive purchases. "
                onClick={()=>clickhighlight("And services prices are now increasing quickly, as rents climb and as worker shortfalls lead to higher wages and steeper prices for restaurant meals and other labor-intensive purchases. ")}
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="If that continues, it could keep inflation elevated even as supply problems are resolved."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Rents picked up by 0.6 percent in April from March, and a measure of housing costs that uses rents to estimate the cost of owned housing climbed 0.5 percent, up from 0.4 percent the prior month. The pickup in housing costs is particularly important, because they make up about a third of the overall inflation index."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="“Domestically generated inflationary pressures remain strong,” Andrew Hunter, senior U.S. economist at Capital Economics, wrote after the report was released."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Part of the increase in core inflation in April owed to trends that should not last, most notably a big pop in airfares as travel demand surges after the latest wave of the coronavirus. Even so, Ms. Rosner-Warburton said she expected annual C.P.I. inflation to remain 5.1 percent at the end of the year, far above levels that prevailed before the pandemic."
            />
        </div>
       
        <div></div>
    
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The Fed aims for 2 percent annual inflation on average, though it defines that goal using a related but different measure that tends to run slightly lower and comes out with more of a delay. That inflation index picked up by 6.6 percent over the year through March, and April figures will be released later this month."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The fact that high inflation is lasting so long is a problem for the central bank. After a full year of unusually swift increases, household and investor expectations for future price changes have been creeping higher, which could perpetuate inflation if households and businesses adjust their behavior, asking for bigger raises and charging more for goods and services."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="As such risks have mounted, the Fed has begun to lift interest rates to try to keep price increases from galloping out of control in a more lasting way. In March, Fed policymakers lifted their main policy interest rate for the first time since 2018, then followed that up with the biggest increase since 2000 at their meeting last week."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="By making it more expensive to borrow money, officials hope to weaken spending and hiring, which could help supply to catch up with demand. As the economy returns to balance, inflation should come down."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Central bankers are hoping that their policies will temper economic growth without pushing unemployment up or plunging America into a recession — engineering what they often call a “soft landing.”"
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="“I really want us to have that be the outcome, but I recognize that it’s not going to be easy to do,” Raphael Bostic, the president of the Federal Reserve Bank of Atlanta, said in an interview on Monday."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Officials have roundly acknowledged that letting the economy down gently will be difficult, and some have suggested that they would be willing to inflict economic pain if that was what it took to tackle high inflation."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="If the economy gets to a point where unemployment begins climbing but inflation remains “unacceptably high,” Mr. Bostic said, price increases will be “the threat that we have to take on board.”"
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="One challenge for policymakers — and even more for families — is that price increases are surfacing in essentials. Food costs rose 0.9 percent in April from the previous month, the 17th consecutive monthly increase, Wednesday’s report showed."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The increase was driven by dairy, nonalcoholic beverages and a 10.3 percent monthly increase in the cost of eggs, as avian flu decimated poultry flocks. Such inflation tends to especially hit the poor, who spend a bigger chunk of their budgets on needs like groceries and gas."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="But as Americans see strong job gains and strong wage growth — albeit not strong enough to fully counteract inflation — many are managing to shoulder the rising costs for now, keeping overall demand strong."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="“Consumers appear willing to accept the higher menu prices, particularly as inflation is broad,” George Holm, chief executive officer at the food distributor and restaurant supplier Performance Food Group, said on an earnings call Wednesday. “Still, this is something to closely monitor across the next few months and quarters.”"
            />
        </div>
        
       
        {/* <div class="css-s99gbd StoryBodyCompanionColumn"><div class="css-53u6y8"><p class="css-at9mc1 evys1bk0">The pressures that have kept inflation elevated for months remain strong, fresh data released Wednesday showed, a challenge for households that are trying to shoulder rising expenses and for the White House and Federal Reserve as they try to put the economy on a steadier path.</p><p class="css-at9mc1 evys1bk0">Annual inflation moderated for the first time in months in April, but the Consumer Price Index still increased 8.3 percent, an uncomfortably rapid pace. At the same time, a closely watched measure that subtracts food and fuel costs actually accelerated.</p><p class="css-at9mc1 evys1bk0">Core inflation — which excludes costs for groceries and gas — picked up 0.6 percent in April from the prior month, faster than its 0.3 percent increase in March. That measure is particularly important for policymakers, who use it as a gauge to help determine where inflation is headed.</p><p class="css-at9mc1 evys1bk0">While the letup in annual inflation may have given President Biden and the Fed a dose of comfort, the overall picture remains worrying. Policymakers have a long way to go to bring price increases down to more normal and stable levels, and the newest data is likely to keep them focused on trying to slow an inflation rate that remains near its fastest pace in 40 years.</p></div><aside class="css-ew4tgv" aria-label="companion column"></aside></div>
        <div class="css-s99gbd StoryBodyCompanionColumn"><div class="css-53u6y8"><p class="css-at9mc1 evys1bk0">“Inflation is too high — they need to bring it down,” said Laura Rosner-Warburton, senior economist at MacroPolicy Perspectives. “The re-acceleration in core inflation is unwelcome.”</p><p class="css-at9mc1 evys1bk0">The report renewed fears among investors that the Fed could speed up plans to raise interest rates, which would further take steam out of the stock market. The S&amp;P 500 fell 1.6 percent, extending a five-week slide that has taken it to the cusp of a so-called bear market — a drop of more than 20 percent from a recent peak. At the close of trading, the index was 18 percent below its January record high. The tech-heavy Nasdaq composite, which has been in a bear market for months, fell 3.2 percent.</p><p class="css-at9mc1 evys1bk0">Annual inflation may have now peaked, having climbed by an even-quicker 8.5 percent in March. It slowed down in April partly because gas prices dropped lower, and partly because of a statistical quirk that will continue through the months ahead. Yearly price changes are now being measured against elevated price readings from last spring, when inflation started to take off. The higher base makes annual increases look less severe.</p></div><aside class="css-ew4tgv" aria-label="companion column"></aside></div>
        <div class="css-s99gbd StoryBodyCompanionColumn"><div class="css-53u6y8"><p class="css-at9mc1 evys1bk0">Still, even the White House greeted the new report with concern.</p><p class="css-at9mc1 evys1bk0">“While it is heartening to see that annual inflation moderated in April, the fact remains that inflation is unacceptably high,” Mr. Biden said in a statement. “Inflation is a challenge for families across the country, and bringing it down is my top economic priority.”</p></div><aside class="css-ew4tgv" aria-label="companion column"></aside></div>
        <div class="css-s99gbd StoryBodyCompanionColumn"><div class="css-53u6y8"><p class="css-at9mc1 evys1bk0">Economists do expect price increases to continue to ebb somewhat this year, because they think that consumer demand will taper off and that supply chain stresses will ease. The crucial question is how much and how quickly that moderation might happen.</p><div><div></div></div><p class="css-at9mc1 evys1bk0">Many analysts have been predicting a slowdown in price increases or even outright price cuts on many goods, but those forecasts look increasingly uncertain. Lockdowns in China and the war in Ukraine threaten to exacerbate supply shortages for semiconductor chips, commodities and other important products.</p><p class="css-at9mc1 evys1bk0">“There are persistent issues in supply chains,” said Matthew Luzzetti, chief U.S. economist at Deutsche Bank. “And the most recent developments have not been positive.”</p><p class="css-at9mc1 evys1bk0">The path ahead for the car market, for instance, remains unclear. Supply shortfalls for used vehicles show some signs of easing, but shortfalls persist in computer chips, which are crucial to automobile production. As a result, companies are still struggling to complete vehicles.</p><p class="css-at9mc1 evys1bk0">Prices for used cars and trucks declined in April from the prior month, though the drop was smaller than the one in March. While car parts had become cheaper in March, they resumed their monthly increase in April. New car prices also accelerated after a lull, climbing 1.7 percent from the prior month.</p></div><aside class="css-ew4tgv" aria-label="companion column"></aside></div>
        <div class="css-s99gbd StoryBodyCompanionColumn"><div class="css-53u6y8"><p class="css-at9mc1 evys1bk0">And services prices are now increasing quickly, as rents climb and as worker shortfalls lead to higher wages and steeper prices for restaurant meals and other labor-intensive purchases. If that continues, it could keep inflation elevated even as supply problems are resolved.</p></div><aside class="css-ew4tgv" aria-label="companion column"></aside></div> */}
        
    </div>
    )
}

export default CPIArticle;
