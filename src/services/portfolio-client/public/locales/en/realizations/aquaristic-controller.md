A simple prototype of an aquarium controller with support for automatic water change and refilling from the reserve tank. Aquarists know this from experience: within a week, from a standard aquarium, it can evaporate up to a dozen liters of water, lowering the water surface and leaving ugly traces on the walls of the aquarium. Changing the water is also a tedious process that usually needs to be done once a week.

The controller supports the automatic top-up of the depleting (evaporating) water in the aquarium. Every few minutes, the controller checks whether the float sensor mounted at the water surface in the aquarium detects water or not. If not, the refilling process begins until the water is refilled to the level determined by the float sensor, or the water in the refill tank runs out.

The automatic top-up is protected against overflow of water in the aquarium by setting the maximum time of adding water: usually we add water in several dozen seconds. If the water is added in more than the tens of seconds specified by us, it may mean that the float switch has probably been blocked by something and the controller stops the refill and reports an error, waiting for the user's reaction, so there is no option for the water to overflow from the aquarium.

Semi-automatic water change in the aquarium allows you to remove the amount of water determined by the float sensor and to supplement it later by controlling the servo valves that open or close the water inlet or outlet. The substitution is also secured against blocking any of the servo valves.

The process of semi-automatic water change also automatically replenishes the water in the refill water tank. The refill water tank has two float sensors that give the relevant signals (maximum and minimum water level) to the controller about the water level in the tank.

The LED aquarium lighting is controlled by the `PWM` signal. The controller controls the lights by brightening and dimming the lighting, simulating morning, noon, evening and night at times set by the user.

The controller also supports other devices in the aquarium, such as a heater, heating lamp, aerator and any other devices that can be time-controlled in a 24-hour cycle.
