1: The render function must be a pure function of props and the
component state, the values returned by useState(). What happens if the output of the
render function is depending on other data that changes over time?

Om render-funktionen beror på data utanför props eller state kan UI bli inkonsekvent, 
data föråldrad, prestandan påverkas och oväntade sid-effekter uppstå. 
Lösning: Hantera data med useState och useEffect.

2: In the code above, the foundations array is computed every time
the component is rendered. The inventory changes very infrequent so you might think this
is inefficient. Can you cache foundations so it is only computed when props.inventory
changes?

Ja, du kan cache:a foundations genom att använda useMemo(). 
Det beräknar värdet bara när props.inventory ändras:
const foundations = useMemo(() => computeFoundations(props.inventory), [props.inventory]);
Detta förbättrar prestandan genom att undvika onödiga beräkningar vid varje render.

3: Should you move the foundation state to the Select component
above? To answer this you need to consider what happens when the user submits the
form.

Nej, flytta inte foundation-state till Select. Det är bättre att behålla all state i ComposeSalad för enkel hantering vid formulärinlämning och för att följa Reacts princip om att lyfta upp delad state.

4: What triggers react to call the render function and update the DOM?
q

React triggar omrendering och uppdatering av DOM när det sker en förändring i komponentens state eller props. När en komponent ändrar sitt state via setState-funktionen (eller motsvarande hook som useState), eller när dess props uppdateras från en föräldrakomponent, så kör React render-funktionen igen för att uppdatera användargränssnittet.

5: When the user change the html form state (DOM), does this change
the state of your component?

Nej, ändringar i DOM uppdaterar inte direkt komponentens state. Du måste använda event handlers för att uppdatera state i React.

6: What is the value of this in the event handling call-back functions?

I event handling callback-funktioner är this vanligtvis komponentinstansen. I funktionella komponenter med hooks är this inte relevant.

7: How is the prototype chain affected when copying an object with copy = {...sourceObject}?

När du kopierar ett objekt med copy = {...sourceObject} skapar du en ytlig kopia. Prototypkedjan förblir oförändrad, men inre objekt refereras av både det ursprungliga och kopierade objektet.


lab 3

Reflection Question: What is the difference between using <Link> and <NavLink> in your
navigation bar? 

<NavLink> markerar automatiskt den aktiva sidan visuellt, medan <Link> inte gör det.

Vad händer om användaren skriver ett ogiltigt UUID i URL:en?

Användaren kan få ett 404-fel eller se en tom vy, beroende på hur routingen hanteras.

Vad innebär en ledande / i en sökväg?

En ledande / gör sökvägen absolut och startar från rotvägen. Utan den är sökvägen relativ och beror på den nuvarande platsen i appen, vilket kan resultera i olika URL:er.